import type { Metadata } from "next";
import Link from "next/link";
import { ApiKeyPanel } from "@/components/ApiKeyPanel";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Metakit dashboard stub — copy your demo API key and start fetching metadata.",
};

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Dashboard</h1>
      <p className="mt-3 text-zinc-400">
        No signup backend in this MVP. Copy a placeholder key and call{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-200">
          /api/v1/meta
        </code>
        . The live server accepts{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-indigo-300">
          {siteConfig.demoApiKey}
        </code>
        .
      </p>
      <div className="mt-10">
        <ApiKeyPanel />
      </div>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link href="/docs" className="text-indigo-400 hover:underline">
          API docs →
        </Link>
        <Link href="/pricing" className="text-indigo-400 hover:underline">
          Buy credits →
        </Link>
      </div>
    </div>
  );
}
