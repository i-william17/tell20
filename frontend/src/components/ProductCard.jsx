import Link from "./Link";
import Money from "./Money";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product, featured = false }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const wished = wishlist.includes(product.id);
  const isSale = product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <article
      className={`group border border-ink/12 bg-bone transition duration-300 hover:-translate-y-1 hover:border-tell hover:shadow-panel ${
        featured ? "lg:grid lg:grid-cols-[1.1fr_0.9fr]" : ""
      }`}
    >
      <Link href={`/products/${product.id}`} className="relative block overflow-hidden bg-paper">
        {isSale && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-tell px-3 py-1 font-mono text-[0.64rem] font-bold uppercase tracking-[0.14em] text-bone">
            Flash sale
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
            featured ? "aspect-[4/3] lg:h-full" : "aspect-[4/3]"
          }`}
        />
      </Link>

      <div className="flex min-h-52 flex-col justify-between p-4">
        <div>
          <div className="flex items-center justify-between gap-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
            <span>{product.category}</span>
            <span>{product.stock <= 10 ? `${product.stock} left` : "In stock"}</span>
          </div>
          <Link href={`/products/${product.id}`} className="mt-4 block">
            <h3 className="text-balance text-2xl font-black leading-[0.95] tracking-[-0.045em] sm:text-3xl">
              {product.name}
            </h3>
          </Link>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-lg font-black tracking-[-0.035em] text-ink">
              <Money value={product.price} />
            </p>
            {isSale && (
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted line-through">
                <Money value={product.compareAtPrice} />
              </p>
            )}
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-ink/68 line-clamp-2">{product.description}</p>
          <div className="mt-4 grid gap-2 font-mono text-[0.66rem] uppercase tracking-[0.13em] text-muted">
            <span>
              Rated {product.rating.toFixed(1)} / {product.reviewCount} reviews
            </span>
            <span>{product.materialType}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto] gap-2 border-t border-ink/12 pt-4">
          <button
            type="button"
            onClick={() => addToCart(product.id, 1, product.sizes[0])}
            className="rounded-full bg-tell px-4 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-bone transition hover:bg-tell-deep"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`rounded-full border px-4 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] transition ${
              wished ? "border-tell bg-tell-soft text-tell-deep" : "border-ink/15 text-ink hover:border-tell"
            }`}
          >
            {wished ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </article>
  );
}
