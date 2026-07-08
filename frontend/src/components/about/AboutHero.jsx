const aboutImages = {
  studio:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85"
};

export default function AboutHero() {
  return (
    <section className="overflow-hidden bg-paper text-ink">

      <div className="min-h-[calc(100vh-4.25rem)]">
        <div className="tell20-about-pattern relative h-[34vh] min-h-[18rem] overflow-hidden border-b border-ink/10">
          <div className="tell20-about-mask absolute inset-0">
            <img
              src={aboutImages.studio}
              alt=""
              className="h-full w-full object-cover grayscale"
            />
          </div>

          <div className="absolute inset-0 bg-tell/10" />
        </div>

        <div className="grid min-h-[calc(66vh-4.25rem)] border-b border-ink/10 lg:grid-cols-[0.38fr_1fr]">
          <aside className="flex flex-col justify-between border-b border-ink/10 px-4 py-5 sm:px-6 lg:border-b-0 lg:border-r lg:px-8">
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink">
              About Tell20
            </p>

            <p className="hidden font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink/70 lg:block">
              Scroll
            </p>
          </aside>

          <div className="flex flex-col justify-between px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div>
              <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.88] tracking-[-0.065em] sm:text-7xl lg:text-8xl xl:text-[6.4rem]">
                <em className="italic text-tell">Tell20</em> is an online
                store for everyday pieces that earn{" "}
                <em className="italic text-tell">repeat use</em>.
              </h1>

              <p className="mt-12 max-w-md text-2xl font-semibold leading-[1.05] tracking-[-0.055em] text-ink lg:ml-0">
                We sell a small edit of pieces that make daily life easier to
                dress for, pack for, carry, gift, and live in.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
              <div className="bg-bone p-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                  Estd.
                </p>
                <p className="mt-3 text-3xl font-black tracking-[-0.06em]">
                  2026
                </p>
              </div>

              <div className="bg-[#DCE8DD] p-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">
                  Located in
                </p>
                <p className="mt-3 text-3xl font-black tracking-[-0.06em]">
                  Kenya
                </p>
              </div>

              <div className="bg-tell p-5 text-bone">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bone/70">
                  Tagline
                </p>
                <p className="mt-3 text-3xl font-black tracking-[-0.06em]">
                  Shop plenty, tell twenty
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}