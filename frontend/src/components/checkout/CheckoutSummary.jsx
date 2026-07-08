import Link from "../Link";
import Money from "../Money";

export default function CheckoutSummary({
  cartItems,
  discount = 0,
  promoCode = "",
  shipping,
  subtotal,
  total
}) {
  return (
    <aside className="h-fit overflow-hidden border border-ink/10 bg-paper">
      <div className="bg-ink p-4 text-bone">
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/50">
          Order summary
        </p>

        <h2 className="mt-3 text-2xl font-black leading-[0.95] tracking-[-0.05em]">
          Review your <em className="italic text-tell-light">pieces</em>.
        </h2>

        <p className="mt-3 text-xs leading-5 text-bone/65">
          Confirm your items, delivery fee, promo discount, and final checkout
          total.
        </p>
      </div>

      <div className="grid gap-px bg-ink/10">
        {cartItems.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="grid grid-cols-[3.75rem_1fr_auto] gap-3 bg-bone p-3"
          >
            <Link
              href={`/products/${item.product.id}`}
              className="block h-14 w-14 shrink-0 overflow-hidden border border-ink/10 bg-paper"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-full w-full object-cover"
              />
            </Link>

            <div className="min-w-0">
              <Link
                href={`/products/${item.product.id}`}
                className="line-clamp-2 text-sm font-black leading-tight tracking-[-0.035em] text-ink transition hover:text-tell-deep"
              >
                {item.product.name}
              </Link>

              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                Qty {item.quantity} / {item.size}
              </p>
            </div>

            <p className="text-right text-xs font-black tracking-[-0.03em] text-ink">
              <Money value={item.product.price * item.quantity} />
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-px bg-ink/10">
        <div className="flex justify-between bg-paper p-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          <span>Subtotal</span>
          <span className="text-ink">
            <Money value={subtotal} />
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between bg-[#DCE8DD] p-4 font-mono text-xs uppercase tracking-[0.16em] text-ink">
            <span>Promo {promoCode}</span>
            <span>
              -<Money value={discount} />
            </span>
          </div>
        )}

        <div className="flex justify-between bg-paper p-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          <span>Shipping</span>
          <span className="text-ink">
            {shipping === 0 ? "Free" : <Money value={shipping} />}
          </span>
        </div>
      </div>

      <div className="bg-tell p-4 text-bone">
        <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/65">
          Total to pay
        </p>

        <div className="mt-3 flex items-end justify-between gap-5">
          <span className="text-3xl font-black leading-none tracking-[-0.06em]">
            Total
          </span>

          <span className="text-right text-2xl font-black leading-none tracking-[-0.05em]">
            <Money value={total} />
          </span>
        </div>
      </div>
    </aside>
  );
}
