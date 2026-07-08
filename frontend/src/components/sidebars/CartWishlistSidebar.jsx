import { useEffect } from "react";
import { useShop } from "../../context/ShopContext";
import Link from "../Link";
import Money from "../Money";

function SidebarLink({ href, children, className = "", onClose }) {
  return (
    <Link href={href} onClick={onClose} className={className}>
      {children}
    </Link>
  );
}

function EmptySidebarState({ message, onClose }) {
  return (
    <div className="border border-ink/12 bg-bone p-5">
      <p className="text-lg leading-7 text-ink/70">{message}</p>
      <SidebarLink
        href="/shop"
        onClose={onClose}
        className="mt-6 inline-flex rounded-full bg-tell px-5 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-bone transition hover:bg-tell-deep"
      >
        Browse shop
      </SidebarLink>
    </div>
  );
}

function CartSidebarContent({ onClose }) {
  const { auth, cartItems, removeFromCart, shipping, subtotal, total, updateQuantity } = useShop();

  if (cartItems.length === 0) {
    return <EmptySidebarState message="Your cart is empty. Add pieces from the shop and they will collect here." onClose={onClose} />;
  }

  return (
    <>
      <div className="grid gap-px overflow-hidden border border-ink/12 bg-ink/12">
        {cartItems.map((item) => (
          <article key={`${item.productId}-${item.size}`} className="grid grid-cols-[5.5rem_1fr] gap-4 bg-bone p-4">
            <SidebarLink href={`/products/${item.product.id}`} onClose={onClose} className="block overflow-hidden">
              <img src={item.product.image} alt={item.product.name} className="aspect-square w-full object-cover" />
            </SidebarLink>

            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                {item.product.category} / {item.size}
              </p>
              <SidebarLink href={`/products/${item.product.id}`} onClose={onClose} className="mt-2 block">
                <h3 className="truncate text-2xl font-black leading-none tracking-[-0.05em]">
                  {item.product.name}
                </h3>
              </SidebarLink>

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="font-bold">
                  <Money value={item.product.price * item.quantity} />
                </p>
                <div className="inline-flex overflow-hidden rounded-full border border-ink/15">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                    className="h-9 w-9 font-mono text-xs"
                    aria-label={`Decrease ${item.product.name} quantity`}
                  >
                    -
                  </button>
                  <span className="grid h-9 w-9 place-items-center border-x border-ink/15 font-mono text-xs">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                    className="h-9 w-9 font-mono text-xs"
                    aria-label={`Increase ${item.product.name} quantity`}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(item.productId, item.size)}
                className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted underline underline-offset-4"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 border border-ink/12 bg-bone p-5">
        <div className="grid gap-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span><Money value={subtotal} /></span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : <Money value={shipping} />}</span>
          </div>
        </div>

        <div className="mt-5 flex justify-between border-t border-ink/12 pt-5 text-3xl font-black tracking-[-0.05em]">
          <span>Total</span>
          <span><Money value={total} /></span>
        </div>

        <SidebarLink
          href="/checkout"
          onClose={onClose}
          className="mt-6 flex w-full justify-center rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
        >
          {auth.isAuthenticated ? "Checkout" : "Sign in to checkout"}
        </SidebarLink>
      </div>
    </>
  );
}

function WishlistSidebarContent({ onClose }) {
  const { moveWishlistToCart, wishlistItems } = useShop();

  if (wishlistItems.length === 0) {
    return <EmptySidebarState message="Your wishlist is empty. Save products while browsing and they will appear here." onClose={onClose} />;
  }

  return (
    <div className="grid gap-px overflow-hidden border border-ink/12 bg-ink/12">
      {wishlistItems.map((product) => (
        <article key={product.id} className="grid grid-cols-[5.5rem_1fr] gap-4 bg-bone p-4">
          <SidebarLink href={`/products/${product.id}`} onClose={onClose} className="block overflow-hidden">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </SidebarLink>

          <div className="min-w-0">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
              {product.category} / {product.sku}
            </p>
            <SidebarLink href={`/products/${product.id}`} onClose={onClose} className="mt-2 block">
              <h3 className="truncate text-2xl font-black leading-none tracking-[-0.05em]">
                {product.name}
              </h3>
            </SidebarLink>
            <p className="mt-3 text-sm font-bold">
              <Money value={product.price} />
            </p>

            <button
              type="button"
              onClick={() => moveWishlistToCart(product.id)}
              className="mt-4 rounded-full border border-ink/15 px-4 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] transition hover:border-tell hover:text-tell-deep"
            >
              Move to cart
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function CartWishlistSidebar({ activePanel, onClose }) {
  const { cartCount, wishlistItems } = useShop();
  const isOpen = Boolean(activePanel);
  const isCart = activePanel === "cart";
  const title = isCart ? "Cart" : "Wishlist";
  const count = isCart ? cartCount : wishlistItems.length;

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label={`${title} sidebar`}>
      <button
        type="button"
        onClick={onClose}
        className="sidebar-backdrop absolute inset-0 cursor-default bg-ink/35"
        aria-label={`Close ${title.toLowerCase()} sidebar`}
      />

      <aside className="sidebar-slide-right absolute right-0 top-0 flex h-dvh max-h-dvh w-full max-w-[30rem] flex-col overflow-hidden border-l border-ink/12 bg-paper shadow-panel">
        <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-5">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {count} {count === 1 ? "item" : "items"}
            </p>
            <h2 className="mt-2 text-5xl font-black leading-none tracking-[-0.07em]">{title}.</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-ink/15 px-4 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] transition hover:border-tell hover:text-tell-deep"
          >
            Close
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          {isCart ? <CartSidebarContent onClose={onClose} /> : <WishlistSidebarContent onClose={onClose} />}
        </div>
      </aside>
    </div>
  );
}
