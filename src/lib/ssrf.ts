/**
 * Basic SSRF guards: scheme allowlist + private / link-local / metadata IP blocking.
 */

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "localhost.localdomain",
  "metadata.google.internal",
  "metadata",
]);

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".").map((p) => Number(p));
  if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    return null;
  }
  return ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
}

function isPrivateIpv4(ip: string): boolean {
  const n = ipv4ToInt(ip);
  if (n === null) return false;
  // 0.0.0.0/8
  if ((n & 0xff000000) === 0x00000000) return true;
  // 10.0.0.0/8
  if ((n & 0xff000000) === 0x0a000000) return true;
  // 127.0.0.0/8
  if ((n & 0xff000000) === 0x7f000000) return true;
  // 169.254.0.0/16 (link-local / cloud metadata)
  if ((n & 0xffff0000) === 0xa9fe0000) return true;
  // 172.16.0.0/12
  if ((n & 0xfff00000) === 0xac100000) return true;
  // 192.168.0.0/16
  if ((n & 0xffff0000) === 0xc0a80000) return true;
  // 100.64.0.0/10 (CGNAT)
  if ((n & 0xffc00000) === 0x64400000) return true;
  return false;
}

function isPrivateIpv6(host: string): boolean {
  const h = host.toLowerCase().replace(/^\[|\]$/g, "");
  if (h === "::1" || h === "::") return true;
  if (h.startsWith("fc") || h.startsWith("fd")) return true; // ULA
  if (h.startsWith("fe80")) return true; // link-local
  // IPv4-mapped ::ffff:x.x.x.x
  const mapped = h.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
  if (mapped) return isPrivateIpv4(mapped[1]);
  return false;
}

export function assertSafeUrl(raw: string): URL {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error("Invalid URL");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Only http and https URLs are allowed");
  }

  const hostname = parsed.hostname.toLowerCase();
  if (!hostname) {
    throw new Error("URL must include a hostname");
  }

  if (BLOCKED_HOSTNAMES.has(hostname) || hostname.endsWith(".localhost")) {
    throw new Error("Private or local hosts are not allowed");
  }

  // Literal IPv4
  if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname) && isPrivateIpv4(hostname)) {
    throw new Error("Private IP addresses are not allowed");
  }

  // Literal IPv6 (with or without brackets already stripped by URL.hostname)
  if (hostname.includes(":") && isPrivateIpv6(hostname)) {
    throw new Error("Private IP addresses are not allowed");
  }

  return parsed;
}
