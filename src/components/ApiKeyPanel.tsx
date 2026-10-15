"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config";

const STORAGE_KEY = "metakit_api_key";

function makePlaceholderKey(): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 16)
      : Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  return `mk_live_demo_${rand}`;
}

export function ApiKeyPanel() {
  const [key, setKey] = useState<string>(siteConfig.demoApiKey);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing) {
        setKey(existing);
      } else {
        const generated = makePlaceholderKey();
        localStorage.setItem(STORAGE_KEY, generated);
        setKey(generated);
      }
    } catch {
      setKey(siteConfig.demoApiKey);
    }
    setReady(true);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(key);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  function resetToSharedDemo() {
    setKey(siteConfig.demoApiKey);
    try {
      localStorage.setItem(STORAGE_KEY, siteConfig.demoApiKey);
    } catch {
      // ignore
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Your API key</h2>
          <p className="mt-1 text-sm text-zinc-500">
            MVP stub — stored in localStorage. Server currently accepts the shared
            demo key only.
          </p>
        </div>
        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300">
          No real auth yet
        </span>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <code className="flex-1 break-all rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-mono text-sm text-indigo-300">
          {ready ? key : "…"}
        </code>
        <button
          type="button"
          onClick={copy}
          className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <button
          type="button"
          onClick={resetToSharedDemo}
          className="text-zinc-400 underline-offset-2 hover:text-white hover:underline"
        >
          Use shared demo key ({siteConfig.demoApiKey})
        </button>
      </div>
      <pre className="mt-6 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-400">
        <code>{`curl -s "/api/v1/meta?url=https://example.com" \\
  -H "x-api-key: ${siteConfig.demoApiKey}"`}</code>
      </pre>
      <p className="mt-3 text-xs text-zinc-600">
        Tip: until real keys ship, always send{" "}
        <code className="text-zinc-400">{siteConfig.demoApiKey}</code> to the API.
      </p>
    </div>
  );
}
