import { siteConfig } from "@/config";

function paymentHref(): string {
  if (siteConfig.stripePaymentLink) return siteConfig.stripePaymentLink;
  return `mailto:${siteConfig.contactEmail}?subject=Metakit%20credit%20pack`;
}

export function PricingCards() {
  const href = paymentHref();
  const isMailto = href.startsWith("mailto:");

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {siteConfig.creditPacks.map((pack) => (
        <div
          key={pack.id}
          className={`relative flex flex-col rounded-2xl border p-6 ${
            pack.highlighted
              ? "border-indigo-500/60 bg-indigo-500/5 shadow-lg shadow-indigo-500/10"
              : "border-zinc-800 bg-zinc-900/40"
          }`}
        >
          {pack.highlighted && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-0.5 text-xs font-semibold text-white">
              Popular
            </span>
          )}
          <h3 className="text-lg font-semibold text-white">{pack.name}</h3>
          <p className="mt-1 text-sm text-zinc-400">{pack.description}</p>
          <p className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight text-white">{pack.price}</span>
            <span className="text-sm text-zinc-500">one-time</span>
          </p>
          <p className="mt-1 text-sm font-medium text-indigo-300">{pack.credits} credits</p>
          <ul className="mt-6 flex-1 space-y-2 text-sm text-zinc-400">
            {pack.perks.map((perk) => (
              <li key={perk} className="flex gap-2">
                <span className="text-indigo-400">✓</span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
          <a
            href={href}
            target={isMailto ? undefined : "_blank"}
            rel={isMailto ? undefined : "noopener noreferrer"}
            className={`mt-8 block rounded-lg py-2.5 text-center text-sm font-semibold ${
              pack.highlighted
                ? "bg-indigo-500 text-white hover:bg-indigo-400"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
          >
            {isMailto ? `${pack.cta} (email)` : pack.cta}
          </a>
        </div>
      ))}
    </div>
  );
}
