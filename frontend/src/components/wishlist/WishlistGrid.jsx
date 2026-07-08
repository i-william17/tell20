import ProductCard from "../ProductCard";

export default function WishlistGrid({ products, onMoveToCart }) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
          <button
            type="button"
            onClick={() => onMoveToCart(product.id)}
            className="mt-3 w-full rounded-full border border-ink/15 bg-paper px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] transition hover:border-tell hover:text-tell-deep"
          >
            Move to cart
          </button>
        </div>
      ))}
    </div>
  );
}
