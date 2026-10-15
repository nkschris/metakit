function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .trim();
}

function attr(tag: string, name: string): string | null {
  const re = new RegExp(
    `${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i",
  );
  const m = tag.match(re);
  if (!m) return null;
  const raw = m[1] ?? m[2] ?? m[3] ?? "";
  return decodeEntities(raw);
}

function metaContent(html: string, key: string, attrName: "property" | "name"): string | null {
  const re = new RegExp(
    `<meta\\b[^>]*\\b${attrName}\\s*=\\s*(["'])${key}\\1[^>]*>`,
    "i",
  );
  const re2 = new RegExp(
    `<meta\\b[^>]*\\bcontent\\s*=\\s*(["'])([^"']*)\\1[^>]*\\b${attrName}\\s*=\\s*(["'])${key}\\3[^>]*>`,
    "i",
  );
  let m = html.match(re);
  if (m) {
    const content = attr(m[0], "content");
    if (content) return content;
  }
  m = html.match(re2);
  if (m) return decodeEntities(m[2]);
  return null;
}

function absoluteUrl(base: string, maybeRelative: string | null): string | null {
  if (!maybeRelative) return null;
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return maybeRelative;
  }
}

export type ParsedMeta = {
  title: string | null;
  description: string | null;
  ogImage: string | null;
  favicon: string | null;
  siteName: string | null;
};

export function parseHtmlMeta(html: string, pageUrl: string): ParsedMeta {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleTag = titleMatch ? decodeEntities(titleMatch[1].replace(/\s+/g, " ")) : null;

  const ogTitle = metaContent(html, "og:title", "property");
  const ogDescription = metaContent(html, "og:description", "property");
  const ogImage = metaContent(html, "og:image", "property");
  const ogSiteName = metaContent(html, "og:site_name", "property");
  const twitterTitle = metaContent(html, "twitter:title", "name");
  const twitterDescription = metaContent(html, "twitter:description", "name");
  const twitterImage = metaContent(html, "twitter:image", "name");
  const metaDescription = metaContent(html, "description", "name");

  let favicon: string | null = null;
  const linkRe =
    /<link\b[^>]*>/gi;
  let linkMatch: RegExpExecArray | null;
  while ((linkMatch = linkRe.exec(html)) !== null) {
    const tag = linkMatch[0];
    const rel = (attr(tag, "rel") || "").toLowerCase();
    if (
      rel.includes("icon") ||
      rel === "shortcut icon" ||
      rel === "apple-touch-icon"
    ) {
      const href = attr(tag, "href");
      // Skip empty / placeholder data URIs (e.g. example.com uses href="data:,")
      if (href && !/^data:,?$/i.test(href.trim())) {
        favicon = href;
        break;
      }
    }
  }
  if (!favicon) {
    try {
      favicon = new URL("/favicon.ico", pageUrl).toString();
    } catch {
      favicon = null;
    }
  }

  return {
    title: ogTitle || twitterTitle || titleTag || null,
    description: ogDescription || twitterDescription || metaDescription || null,
    ogImage: absoluteUrl(pageUrl, ogImage || twitterImage || null),
    favicon: absoluteUrl(pageUrl, favicon),
    siteName: ogSiteName || null,
  };
}
