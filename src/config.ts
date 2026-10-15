/**
 * Metakit site config.
 * Paste your Stripe Payment Link below (or set NEXT_PUBLIC_STRIPE_PAYMENT_LINK in .env).
 */
export const siteConfig = {
  name: "Metakit",
  tagline: "URL metadata API for builders",
  description:
    "One API call to fetch title, description, Open Graph image, favicon, and more from any URL. Built for vibe coders shipping link previews.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://metakit.dev",
  // TODO: paste Stripe Payment Link URL here (or set NEXT_PUBLIC_STRIPE_PAYMENT_LINK)
  stripePaymentLink: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "",
  contactEmail: "hello@metakit.dev",
  demoApiKey: "mk_live_demo_metakit",
  social: {
    twitter: "@metakit",
  },
  creditPacks: [
    {
      id: "starter",
      name: "Starter",
      price: "$9",
      credits: "1,000",
      description: "Enough for side projects and early MVPs.",
      perks: [
        "1,000 metadata fetches",
        "Demo-compatible API key",
        "JSON responses",
        "Email support",
      ],
      cta: "Buy Starter",
      highlighted: false,
    },
    {
      id: "builder",
      name: "Builder",
      price: "$29",
      credits: "10,000",
      description: "Best for shipping products that show link previews.",
      perks: [
        "10,000 metadata fetches",
        "Priority rate limits (soon)",
        "JSON responses",
        "Email support",
      ],
      cta: "Buy Builder",
      highlighted: true,
    },
    {
      id: "scale",
      name: "Scale",
      price: "$79",
      credits: "50,000",
      description: "One-time pack for higher-volume apps and bots.",
      perks: [
        "50,000 metadata fetches",
        "Higher rate limits (soon)",
        "JSON responses",
        "Priority email support",
      ],
      cta: "Buy Scale",
      highlighted: false,
    },
  ],
} as const;

export type CreditPack = (typeof siteConfig.creditPacks)[number];
