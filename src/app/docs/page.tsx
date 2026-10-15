import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: "API docs",
  description:
    "Metakit API reference: GET/POST /api/v1/meta for URL metadata and link previews.",
};

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium text-indigo-400">API reference</p>
      <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
        /api/v1/meta
      </h1>
      <p className="mt-4 text-zinc-400">
        Fetch title, description, Open Graph image, favicon, and site name for any
        public URL. Requires an{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-200">
          x-api-key
        </code>{" "}
        header.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Authentication</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Send your key on every request. Demo key (MVP):{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-indigo-300">
            {siteConfig.demoApiKey}
          </code>
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300 sm:text-sm">
          <code>{`x-api-key: ${siteConfig.demoApiKey}`}</code>
        </pre>
        <p className="mt-3 text-sm text-zinc-500">
          Missing or invalid key →{" "}
          <code className="text-zinc-300">401</code> JSON error. Get a key on{" "}
          <Link href="/signup" className="text-indigo-400 hover:underline">
            /signup
          </Link>
          .
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">GET</h2>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300 sm:text-sm">
          <code>{`GET /api/v1/meta?url=https%3A%2F%2Fexample.com
x-api-key: ${siteConfig.demoApiKey}`}</code>
        </pre>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">POST</h2>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300 sm:text-sm">
          <code>{`POST /api/v1/meta
Content-Type: application/json
x-api-key: ${siteConfig.demoApiKey}

{ "url": "https://example.com" }`}</code>
        </pre>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Success response</h2>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300 sm:text-sm">
          <code>{`{
  "url": "https://example.com/",
  "title": "Example Domain",
  "description": null,
  "ogImage": null,
  "favicon": "https://example.com/favicon.ico",
  "siteName": null,
  "statusCode": 200,
  "fetchedAt": "2026-10-15T12:00:00.000Z"
}`}</code>
        </pre>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="border-b border-zinc-800 text-zinc-300">
              <tr>
                <th className="py-2 pr-4 font-medium">Field</th>
                <th className="py-2 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["url", "string — final URL after redirects"],
                ["title", "string | null"],
                ["description", "string | null"],
                ["ogImage", "string | null — absolute URL"],
                ["favicon", "string | null — absolute URL"],
                ["siteName", "string | null"],
                ["statusCode", "number — upstream HTTP status"],
                ["fetchedAt", "string — ISO 8601 UTC"],
              ].map(([field, type]) => (
                <tr key={field} className="border-b border-zinc-900">
                  <td className="py-2 pr-4 font-mono text-indigo-300">{field}</td>
                  <td className="py-2">{type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">Errors</h2>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300 sm:text-sm">
          <code>{`{
  "error": "unauthorized",
  "message": "Missing x-api-key header...",
  "statusCode": 401
}`}</code>
        </pre>
        <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-zinc-400">
          <li>
            <code className="text-zinc-300">400</code> — invalid / private URL
          </li>
          <li>
            <code className="text-zinc-300">401</code> — missing or bad API key
          </li>
          <li>
            <code className="text-zinc-300">502</code> — upstream fetch failed
          </li>
          <li>
            <code className="text-zinc-300">504</code> — upstream timeout (5s)
          </li>
        </ul>
      </section>

      <section className="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 text-sm text-zinc-400">
        <h2 className="font-semibold text-white">Safety defaults</h2>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>http/https only</li>
          <li>Private / loopback / link-local IPs blocked</li>
          <li>5 second timeout</li>
          <li>~1.5 MB max HTML body</li>
          <li>Custom User-Agent: MetakitBot/1.0</li>
        </ul>
      </section>
    </div>
  );
}
