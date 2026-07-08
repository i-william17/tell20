export default function ShopHero({ activeSearchTerm, resultCount }) {
  return (
    <>
      <h1 className="max-w-6xl text-balance text-6xl font-black leading-[0.86] tracking-[-0.075em] sm:text-8xl lg:text-[9rem]">
        Shop <em className="italic text-tell">plenty</em>, tell <em className="italic text-tell">twenty</em>.
      </h1>

      {activeSearchTerm && (
        <div className="mt-8 border-l-4 border-tell bg-bone px-5 py-4">
          <p className="text-3xl font-black leading-none tracking-[-0.05em] text-ink">
            Search results for <span className="italic text-tell">"{activeSearchTerm}"</span>
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            {resultCount} matching products
          </p>
        </div>
      )}
    </>
  );
}
