import AnimatedSection from "../AnimatedSection";
import Link from "../Link";

export default function CheckoutEmptyState() {
  return (
    <AnimatedSection className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-report border border-ink/12 bg-bone p-8">
        <h1 className="text-6xl font-black tracking-[-0.07em]">Cart cleared.</h1>
        <p className="mt-5 max-w-xl text-xl leading-8 text-ink/70">There is nothing left to check out.</p>
        <Link href="/shop" className="mt-8 inline-flex rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone">
          Back to shop
        </Link>
      </div>
    </AnimatedSection>
  );
}
