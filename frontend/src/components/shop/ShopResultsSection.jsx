import AnimatedSection from "../AnimatedSection";
import ShopGuideCard from "./ShopGuideCard";
import ShopProductGrid from "./ShopProductGrid";

export default function ShopResultsSection({ clearFilters, products }) {
  return (
    <AnimatedSection className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-report">
        <ShopProductGrid clearFilters={clearFilters} products={products} />
        <ShopGuideCard />
      </div>
    </AnimatedSection>
  );
}
