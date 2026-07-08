import AnimatedSection from "../AnimatedSection";

const aboutImages = {
  fitting:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=85"
};

const valueBlocks = [
  {
    eyebrow: "01",
    title: "Fewer, better choices",
    body:
      "The store is edited down to pieces that work across days, seasons, and routines. Nothing is added because a grid needs filling."
  },
  {
    eyebrow: "02",
    title: "Useful before decorative",
    body:
      "Every product has to solve a simple problem: carry more, layer better, wear longer, or make a room feel easier to live in."
  },
  {
    eyebrow: "03",
    title: "Clear buying, clear returns",
    body:
      "No forced account password, no hidden delivery rule, no unclear return window. The customer should always know what happens next."
  }
];

export default function AboutValues() {
  return (
    <AnimatedSection className="bg-ink px-4 py-14 text-bone sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-report overflow-hidden border border-bone/10 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="relative min-h-[26rem] overflow-hidden border-b border-bone/10 lg:min-h-[54rem] lg:border-b-0 lg:border-r">
          <img
            src={aboutImages.fitting}
            alt="Clothing rack and fitting room"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-ink/20" />

          <div className="absolute bottom-0 left-0 right-0 border-t border-bone/15 bg-ink/70 p-5 backdrop-blur-sm sm:p-6">
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/55">
              Tell20 edit system
            </p>
            <p className="mt-3 max-w-sm text-2xl font-black leading-[0.95] tracking-[-0.055em] text-bone sm:text-3xl">
              Products chosen for real use, not endless scrolling.
            </p>
          </div>
        </div>

        <div className="bg-paper text-ink">
          <div className="grid gap-8 border-b border-ink/20 px-6 py-8 sm:px-8 lg:grid-cols-[0.35fr_1fr] lg:py-10">
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink">
              What makes the edit
            </p>

            <h2 className="max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl">
              Built around{" "}
              <em className="italic text-tell">repeat use</em>.
            </h2>
          </div>

          <div className="divide-y divide-ink/20">
            {valueBlocks.map((item) => (
              <article
                key={item.title}
                className="grid min-h-[14rem] gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[0.35fr_1fr] lg:py-10"
              >
                <div className="flex flex-col justify-between">
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink/60">
                    {item.eyebrow}
                  </p>
                </div>

                <div>
                  <h3 className="max-w-2xl text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-5xl">
                    {item.title}
                  </h3>

                  <p className="mt-6 max-w-2xl text-base leading-7 text-ink/72">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}