import ProductCard from "../ProductCard";
import ShopEmptyState from "./ShopEmptyState";

export default function ShopProductGrid({ clearFilters, products }) {
  if (products.length === 0) {
    return <ShopEmptyState clearFilters={clearFilters} />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
