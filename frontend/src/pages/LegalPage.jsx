import AnimatedSection from "../components/AnimatedSection";
import { getLegalContent } from "../data/legalContent";

export default function LegalPage({ type = "terms" }) {
  const content = getLegalContent(type);

  return (
    <AnimatedSection className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-report gap-8 lg:grid-cols-[0.34fr_1fr]">
        <aside className="h-fit border border-ink/12 bg-bone p-6 lg:sticky lg:top-28">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Tell20 legal</p>
          <h1 className="mt-5 text-5xl font-black leading-none tracking-[-0.07em]">{content.title}</h1>
          <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink/55">
            Last updated {content.lastUpdated}
          </p>
          <p className="mt-6 text-sm leading-6 text-ink/70">{content.intro}</p>
        </aside>

        <div>
          <div className="border border-ink/12 bg-bone p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Overview</p>
            <h2 className="mt-4 max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl">
              {content.label} for account, wishlist, cart, checkout, delivery, and support.
            </h2>
          </div>

          <div className="mt-6 grid gap-px overflow-hidden border border-ink/12 bg-ink/12">
            {content.sections.map((section) => (
              <article key={section.title} className="bg-paper p-6 sm:p-8">
                <h2 className="text-3xl font-black leading-none tracking-[-0.055em]">{section.title}</h2>
                <p className="mt-5 text-lg leading-8 text-ink/72">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
