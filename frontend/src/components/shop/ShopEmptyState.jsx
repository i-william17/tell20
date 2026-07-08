export default function ShopEmptyState({ clearFilters }) {
  return (
    <div className="overflow-hidden border border-ink/10 bg-paper">
      <div className="grid lg:grid-cols-[0.34fr_1fr]">
        <aside className="bg-ink p-6 text-bone sm:p-8">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/50">
            Search result
          </p>

          <p className="mt-8 text-7xl font-black leading-none tracking-[-0.08em] sm:text-8xl">
            0
          </p>

          <p className="mt-5 max-w-xs text-sm leading-6 text-bone/65">
            No products matched the current search or filter selection.
          </p>
        </aside>

        <div className="bg-bone p-6 sm:p-8 lg:p-10">
          <h2 className="max-w-3xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl">
            No <em className="italic text-tell">match</em> found.
          </h2>

          <p className="mt-6 max-w-2xl text-xl leading-8 text-ink/70">
            Try another search term or clear the filters to return to the full
            Tell20 edit.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
            >
              Clear filters
            </button>
          </div>

          <div className="mt-10 grid overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
            <div className="bg-paper p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                Tip
              </p>
              <p className="mt-3 text-2xl font-black tracking-[-0.05em]">
                Shorten search
              </p>
            </div>

            <div className="bg-[#DCE8DD] p-5">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">
                Browse
              </p>
              <p className="mt-3 text-2xl font-black tracking-[-0.05em]">
                All categories
              </p>
            </div>

            <div className="bg-tell p-5 text-bone">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bone/70">
                Reset
              </p>
              <p className="mt-3 text-2xl font-black tracking-[-0.05em]">
                Full edit
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}