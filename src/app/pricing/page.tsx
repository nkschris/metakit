import type { Metadata } from "next";
import Link from "next/link";
import { PricingCards } from "@/components/PricingCards";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Metakit one-time credit packs — $9 / $29 / $79 for URL metadata API fetches.",
};

export default function PricingPage() {
  const hasStripe = Boolean(siteConfig.stripePaymentLink);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Credit packs
        </h1>
        <p className="mt-4 text-zinc-400">
          Pay once, use credits for metadata fetches. Subscriptions can come later —
          this MVP is packs-first.
        </p>
      </div>
      <div className="mt-12">
        <PricingCards />
      </div>
      <p className="mt-10 text-center text-sm text-zinc-500">
        {hasStripe ? (
          <>Checkout opens Stripe Payment Link.</>
        ) : (
          <>
            Stripe Payment Link not set yet — buttons fall back to{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-indigo-400 hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
            . Paste the link in{" "}
            <code className="text-zinc-300">NEXT_PUBLIC_STRIPE_PAYMENT_LINK</code> or{" "}
            <code className="text-zinc-300">src/config.ts</code>.
          </>
        )}
      </p>
      <p className="mt-4 text-center text-sm text-zinc-500">
        Already buying?{" "}
        <Link href="/signup" className="text-indigo-400 hover:underline">
          Open the dashboard stub
        </Link>{" "}
        for your demo API key.
      </p>
    </div>
  );
}
