import AnimatedSection from "../AnimatedSection";
import Link from "../Link";

export default function CheckoutSuccess({ order }) {
  return (
    <AnimatedSection className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-report border border-ink/12 bg-bone p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Order {order.id}</p>
        <h1 className="mt-5 max-w-4xl text-balance text-6xl font-black leading-[0.86] tracking-[-0.075em] sm:text-8xl">
          Checkout complete.
        </h1>
        <p className="mt-6 max-w-xl text-xl leading-8 text-ink/70">
          Your Tell20 order is confirmed. A receipt and delivery update will be sent to your verified email.
        </p>
        <Link href="/shop" className="mt-8 inline-flex rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone">
          Continue shopping
        </Link>
      </div>
    </AnimatedSection>
  );
}
