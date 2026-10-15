import Link from "next/link";
import { CodeSample } from "@/components/CodeSample";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PricingCards } from "@/components/PricingCards";
import { siteConfig } from "@/config";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.18),_transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-4 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
            URL metadata API · credit packs
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Link previews in one JSON call
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-400">
            {siteConfig.description} Pass a URL, get title, description, ogImage,
            favicon, and siteName — no HTML scraping on your side.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
            >
              Get free demo key
            </Link>
            <Link
              href="/docs"
              className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:border-zinc-500 hover:text-white"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">What it does</h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Metakit fetches the page server-side (5s timeout, safe defaults) and
          parses Open Graph / meta tags so your app can render rich link cards.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Title & description", d: "og:title, twitter, or <title>" },
            { t: "OG image", d: "Absolute og:image / twitter:image URL" },
            { t: "Favicon", d: "link rel=icon or /favicon.ico fallback" },
            { t: "Site name", d: "og:site_name when present" },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
            >
              <h3 className="font-semibold text-white">{item.t}</h3>
              <p className="mt-1 text-sm text-zinc-500">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Code sample */}
      <section id="examples" className="border-y border-zinc-800 bg-zinc-950/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Try it</h2>
          <p className="mt-3 mb-8 max-w-2xl text-zinc-400">
            Use the demo key{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-indigo-300">
              {siteConfig.demoApiKey}
            </code>{" "}
            — send it as{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
              x-api-key
            </code>
            .
          </p>
          <CodeSample />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            One-time credit packs
          </h2>
          <p className="mt-3 text-zinc-400">
            No subscription required to start. Buy credits, ship previews.
          </p>
        </div>
        <PricingCards />
        <p className="mt-6 text-center text-sm text-zinc-500">
          Prefer details? See{" "}
          <Link href="/pricing" className="text-indigo-400 hover:underline">
            /pricing
          </Link>
          .
        </p>
      </section>

      {/* Newsletter */}
      <section className="border-t border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white">Builder updates</h2>
          <p className="mx-auto mt-3 max-w-md text-zinc-400">
            Occasional notes on API changes and credit deals. Resend wiring is TODO.
          </p>
          <div className="relative mx-auto mt-6 max-w-lg">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
