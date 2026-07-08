import Link from "../Link";

export default function CartEmptyState() {
  return (
    <div className="mt-10 overflow-hidden border border-ink/10 bg-paper">
      <div className="grid lg:grid-cols-[0.38fr_1fr]">
        <aside className="bg-ink p-6 text-bone sm:p-8">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/50">
            Cart status
          </p>

          <p className="mt-8 text-7xl font-black leading-none tracking-[-0.08em] sm:text-8xl">
            0
          </p>

          <p className="mt-5 max-w-xs text-sm leading-6 text-bone/65">
            No items are waiting for checkout yet.
          </p>
        </aside>

        <div className="bg-bone p-6 sm:p-8 lg:p-10">
          <h2 className="max-w-3xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl">
            Your cart is{" "}
            <em className="italic text-tell">empty</em>.
          </h2>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-ink/70">
            Add something useful, then check out securely with Tell20 OTP
            verification.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="inline-flex rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
            >
              Go shopping
            </Link>

            <Link
              href="/wishlist"
              className="inline-flex rounded-full border border-ink/15 px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:border-tell hover:text-tell-deep"
            >
              View wishlist
            </Link>
          </div>

          <div className="mt-10 grid overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
            <div className="bg-paper p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                Checkout
              </p>
              <p className="mt-3 text-2xl font-black tracking-[-0.05em]">
                OTP secure
              </p>
            </div>

            <div className="bg-[#DCE8DD] p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">
                Delivery
              </p>
              <p className="mt-3 text-2xl font-black tracking-[-0.05em]">
                48h dispatch
              </p>
            </div>

            <div className="bg-tell p-5 text-bone">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bone/70">
                Returns
              </p>
              <p className="mt-3 text-2xl font-black tracking-[-0.05em]">
                14 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}