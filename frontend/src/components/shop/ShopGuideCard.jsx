import Link from "../Link";

export default function ShopGuideCard() {
  return (
    <div className="mt-12 border border-ink/12 bg-bone p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="max-w-3xl text-balance text-4xl font-black leading-[0.9] tracking-[-0.055em] sm:text-6xl">
            Not sure where to start?
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
            Start with the pieces that handle the most days: a shirt, a tote, a trouser, and a pack.
          </p>
        </div>
        <Link
          href="/about"
          className="inline-flex w-fit rounded-full border border-ink/15 px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:border-tell hover:text-tell-deep"
        >
          How we choose
        </Link>
      </div>
    </div>
  );
}
