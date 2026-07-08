import Link from "../Link";
import Money from "../Money";

export default function CartItems({ items, removeFromCart, updateQuantity }) {
  return (
    <div className="grid gap-px overflow-hidden border border-ink/12 bg-ink/12">
      {items.map((item) => (
        <article key={`${item.productId}-${item.size}`} className="grid gap-5 bg-bone p-5 sm:grid-cols-[9rem_1fr_auto]">
          <Link href={`/products/${item.product.id}`} className="block overflow-hidden">
            <img src={item.product.image} alt={item.product.name} className="aspect-square w-full object-cover" />
          </Link>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {item.product.category} / {item.size}
            </p>
            <Link href={`/products/${item.product.id}`} className="mt-3 block">
              <h2 className="text-3xl font-black leading-none tracking-[-0.05em]">{item.product.name}</h2>
            </Link>
            <button
              type="button"
              onClick={() => removeFromCart(item.productId, item.size)}
              className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-muted underline underline-offset-4"
            >
              Remove
            </button>
          </div>
          <div className="flex items-start justify-between gap-4 sm:block sm:text-right">
            <p className="text-2xl font-black tracking-[-0.04em]">
              <Money value={item.product.price * item.quantity} />
            </p>
            <div className="mt-0 inline-flex overflow-hidden rounded-full border border-ink/15 sm:mt-5">
              <button
                type="button"
                onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                className="h-10 w-10 font-mono"
              >
                -
              </button>
              <span className="grid h-10 w-10 place-items-center border-x border-ink/15 font-mono text-xs">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                className="h-10 w-10 font-mono"
              >
                +
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
