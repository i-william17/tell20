import AnimatedSection from "../AnimatedSection";
import ProductCard from "../ProductCard";

export default function RelatedProducts({ category, products }) {
  if (products.length === 0) return null;

  return (
    <AnimatedSection className="overflow-hidden bg-paper text-ink">
      <div className="border-y border-ink/10">
        <div className="mx-auto grid max-w-report lg:grid-cols-[0.34fr_1fr]">
          <aside className="bg-ink px-4 py-8 text-bone sm:px-6 lg:px-8">
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/50">
              Related edit
            </p>

            <p className="mt-6 text-5xl font-black leading-none tracking-[-0.08em] sm:text-6xl">
              {products.length}
            </p>

            <p className="mt-5 max-w-xs text-sm leading-6 text-bone/65">
              More Tell20 pieces from the same category.
            </p>
          </aside>

          <div className="bg-bone px-4 py-8 sm:px-6 lg:px-8">
            <h2 className="max-w-5xl text-balance text-3xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl">
              More in{" "}
              <em className="italic text-tell">{category.toLowerCase()}</em>.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
              Similar pieces selected from the same Tell20 edit, ready to add to
              wishlist or cart.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-paper px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-report">
          <div className="grid gap-4 md:grid-cols-3">
            {products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
