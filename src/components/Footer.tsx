import Link from "next/link";
import { siteConfig } from "@/config";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-1 max-w-sm text-sm text-zinc-500">
            URL metadata API for vibe coders. Fetch title, description, OG image, and favicon in one JSON call.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-zinc-400">
          <Link href="/docs" className="hover:text-white">
            Docs
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/signup" className="hover:text-white">
            Dashboard
          </Link>
          <a href="/llms.txt" className="hover:text-white">
            llms.txt
          </a>
        </div>
      </div>
      <div className="border-t border-zinc-900 py-4 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} {siteConfig.name}. Built for builders.
      </div>
    </footer>
  );
}
