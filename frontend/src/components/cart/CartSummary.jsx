import Link from "../Link";
import Money from "../Money";

export default function CartSummary({ auth, shipping, subtotal, total }) {
  return (
    <aside className="h-fit border border-ink/12 bg-bone p-6 lg:sticky lg:top-24">
      <div className="grid gap-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span><Money value={subtotal} /></span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : <Money value={shipping} />}</span>
        </div>
      </div>
      <div className="mt-6 flex justify-between border-t border-ink/12 pt-5 text-3xl font-black tracking-[-0.05em]">
        <span>Total</span>
        <span><Money value={total} /></span>
      </div>
      <Link
        href="/checkout"
        className="mt-8 flex w-full justify-center rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
      >
        {auth.isAuthenticated ? "Checkout" : "Sign in to checkout"}
      </Link>
    </aside>
  );
}
