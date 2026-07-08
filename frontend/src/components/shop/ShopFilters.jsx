import { useCallback, useEffect } from "react";
import Money from "../Money";

const fieldClass =
  "h-12 border border-ink/15 bg-paper px-3 font-mono text-xs uppercase tracking-[0.12em] outline-none transition focus:border-tell";

function FilterSelect({ children, label, onChange, value }) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className={fieldClass}>
        {children}
      </select>
    </label>
  );
}

function FilterOption({ value }) {
  return (
    <option value={value}>
      {value}
    </option>
  );
}

export default function ShopFilters({
  clearFilters,
  filters,
  filtersOpen,
  flashSaleCount,
  maxPriceValue,
  minPriceValue,
  options,
  priceRange,
  priceStep,
  productCount,
  query,
  resultCount,
  setFiltersOpen,
  setQuery,
  setSort,
  sort,
  updateFilter,
  updateMaxPrice,
  updateMinPrice
}) {
  const closeFilters = useCallback(() => setFiltersOpen(false), [setFiltersOpen]);

  useEffect(() => {
    if (!filtersOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeFilters();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeFilters, filtersOpen]);

  return (
    <div className="mt-10 border border-ink/12 bg-bone p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Shop filters</p>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            {resultCount} of {productCount} products / <Money value={minPriceValue} /> to{" "}
            <Money value={maxPriceValue} />
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-ink/15 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] transition hover:border-tell hover:text-tell-deep"
          >
            Clear filters
          </button>
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            aria-expanded={filtersOpen}
            className="rounded-full bg-tell px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-bone transition hover:bg-tell-deep"
          >
            Open filters
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/12 pt-4">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
          {resultCount} of {productCount} products
        </p>
        <p className="text-sm leading-6 text-ink/65">
          Prices run from <Money value={priceRange.min} /> to <Money value={priceRange.max} />.
        </p>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Shop filters">
          <button
            type="button"
            onClick={closeFilters}
            className="sidebar-backdrop absolute inset-0 cursor-default bg-ink/35"
            aria-label="Close shop filters"
          />

          <aside className="sidebar-slide-left absolute left-0 top-0 flex h-dvh max-h-dvh w-full max-w-[29rem] flex-col overflow-hidden border-r border-ink/12 bg-paper shadow-panel">
            <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {resultCount} matching products
                </p>
                <h2 className="mt-2 text-5xl font-black leading-none tracking-[-0.07em]">Filters.</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full border border-ink/15 px-4 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] transition hover:border-tell hover:text-tell-deep"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={closeFilters}
                  className="rounded-full border border-ink/15 px-4 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] transition hover:border-tell hover:text-tell-deep"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              <div className="grid gap-4">
                <label className="grid gap-2">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Search</span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Product, SKU, material, tag"
                    className="h-12 border border-ink/15 bg-paper px-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-tell"
                  />
                </label>

                <FilterSelect label="Category" value={filters.category} onChange={(value) => updateFilter("category", value)}>
                  {options.categories.map((item) => <FilterOption key={item} value={item} />)}
                </FilterSelect>

                <FilterSelect label="Size" value={filters.size} onChange={(value) => updateFilter("size", value)}>
                  {options.sizes.map((item) => <FilterOption key={item} value={item} />)}
                </FilterSelect>

                <FilterSelect label="Color" value={filters.color} onChange={(value) => updateFilter("color", value)}>
                  {options.colors.map((item) => <FilterOption key={item} value={item} />)}
                </FilterSelect>

                <FilterSelect label="Material" value={filters.material} onChange={(value) => updateFilter("material", value)}>
                  {options.materials.map((item) => <FilterOption key={item} value={item} />)}
                </FilterSelect>

                <div className="grid gap-3 border border-ink/15 bg-bone p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Price range</span>
                    <span className="text-sm font-bold text-ink">
                      <Money value={minPriceValue} /> - <Money value={maxPriceValue} />
                    </span>
                  </div>
                  <label className="grid gap-2">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">Min price</span>
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      step={priceStep}
                      value={minPriceValue}
                      onChange={(event) => updateMinPrice(event.target.value)}
                      className="w-full accent-[#078B88]"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">Max price</span>
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      step={priceStep}
                      value={maxPriceValue}
                      onChange={(event) => updateMaxPrice(event.target.value)}
                      className="w-full accent-[#078B88]"
                    />
                  </label>
                </div>

                <FilterSelect label="Rating" value={filters.minRating} onChange={(value) => updateFilter("minRating", value)}>
                  <option value="0">Any</option>
                  <option value="4.5">4.5 plus</option>
                  <option value="4.7">4.7 plus</option>
                  <option value="4.9">4.9 plus</option>
                </FilterSelect>

                <FilterSelect label="Stock" value={filters.availability} onChange={(value) => updateFilter("availability", value)}>
                  <option value="all">Any stock</option>
                  <option value="in-stock">In stock</option>
                  <option value="low-stock">Low stock</option>
                </FilterSelect>

                <FilterSelect label="Sort" value={sort} onChange={setSort}>
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Most reviewed</option>
                  <option value="rating">Top rated</option>
                  <option value="sale">Biggest sale</option>
                  <option value="low">Price low</option>
                  <option value="high">Price high</option>
                  <option value="name">Name</option>
                </FilterSelect>

                <label className="flex min-h-12 items-center gap-3 border border-ink/15 bg-bone px-4 py-3">
                  <input
                    type="checkbox"
                    checked={filters.saleOnly}
                    onChange={(event) => updateFilter("saleOnly", event.target.checked)}
                    className="h-4 w-4 accent-[#078B88]"
                  />
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink">
                    Flash sale ({flashSaleCount})
                  </span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-ink/10 bg-paper px-5 py-5">
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-ink/15 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] transition hover:border-tell hover:text-tell-deep"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={closeFilters}
                className="rounded-full bg-tell px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-bone transition hover:bg-tell-deep"
              >
                Show results
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
