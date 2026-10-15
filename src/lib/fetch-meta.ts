import { assertSafeUrl } from "./ssrf";
import { parseHtmlMeta } from "./parse-html";
import type { MetaResponse } from "./types";

const FETCH_TIMEOUT_MS = 5000;
const MAX_BYTES = 1_500_000; // ~1.5 MB
const USER_AGENT =
  "MetakitBot/1.0 (+https://metakit.dev; metadata fetcher; contact=hello@metakit.dev)";

export async function fetchMeta(rawUrl: string): Promise<MetaResponse> {
  const url = assertSafeUrl(rawUrl);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.8",
      },
    });

    const contentType = res.headers.get("content-type") || "";
    const finalUrl = res.url || url.toString();

    // Re-check final URL after redirects
    assertSafeUrl(finalUrl);

    let html = "";
    if (
      contentType.includes("text/html") ||
      contentType.includes("application/xhtml") ||
      contentType.includes("text/plain") ||
      !contentType
    ) {
      const buf = await res.arrayBuffer();
      const slice = buf.byteLength > MAX_BYTES ? buf.slice(0, MAX_BYTES) : buf;
      html = new TextDecoder("utf-8").decode(slice);
    }

    const parsed = html
      ? parseHtmlMeta(html, finalUrl)
      : {
          title: null,
          description: null,
          ogImage: null,
          favicon: null,
          siteName: null,
        };

    if (!parsed.favicon) {
      try {
        parsed.favicon = new URL("/favicon.ico", finalUrl).toString();
      } catch {
        parsed.favicon = null;
      }
    }

    return {
      url: finalUrl,
      title: parsed.title,
      description: parsed.description,
      ogImage: parsed.ogImage,
      favicon: parsed.favicon,
      siteName: parsed.siteName,
      statusCode: res.status,
      fetchedAt: new Date().toISOString(),
    };
  } finally {
    clearTimeout(timer);
  }
}
