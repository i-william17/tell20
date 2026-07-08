import AnimatedSection from "../AnimatedSection";
import Link from "../Link";

const assets = {
  lightLogo: "/logos/secondary-logo1.png"
};

export default function AboutCta() {
  return (
    <AnimatedSection className="bg-ink px-4 py-14 text-bone sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-report gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <img src={assets.lightLogo} alt="Tell20" className="max-h-80 w-full object-contain" />
        <div>
          <h2 className="max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl">
            Shop only what should stay in rotation.
          </h2>
          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-light hover:text-tell-dark"
          >
            Shop the edit
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
