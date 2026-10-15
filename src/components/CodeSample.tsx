import { siteConfig } from "@/config";

const curlSample = `curl -s "${siteConfig.url}/api/v1/meta?url=https://example.com" \\
  -H "x-api-key: ${siteConfig.demoApiKey}"`;

const jsSample = `const res = await fetch(
  "${siteConfig.url}/api/v1/meta?url=" + encodeURIComponent("https://example.com"),
  { headers: { "x-api-key": "${siteConfig.demoApiKey}" } }
);
const meta = await res.json();
// { url, title, description, ogImage, favicon, siteName, statusCode, fetchedAt }`;

export function CodeSample() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 text-xs text-zinc-500">
          <span>curl</span>
          <span className="font-mono">GET</span>
        </div>
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-zinc-300 sm:text-sm">
          <code>{curlSample}</code>
        </pre>
      </div>
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 text-xs text-zinc-500">
          <span>JavaScript fetch</span>
          <span className="font-mono">GET</span>
        </div>
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-zinc-300 sm:text-sm">
          <code>{jsSample}</code>
        </pre>
      </div>
    </div>
  );
}
