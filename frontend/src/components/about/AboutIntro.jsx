import AnimatedSection from "../AnimatedSection";

const supportLinks = [
  "Wear",
  "Carry",
  "Footwear",
  "Home",
  "Checkout",
  "Returns"
];

const valueTiles = [
  {
    title: "Wear",
    body: "Daily pieces selected for repeat use."
  },
  {
    title: "Carry",
    body: "Bags and essentials that make movement easier."
  },
  {
    title: "Home",
    body: "Simple goods that make rooms feel useful."
  },
  {
    title: "Checkout",
    body: "OTP-protected flow with clear returns."
  }
];

export default function AboutIntro() {
  return (
    <AnimatedSection className="bg-paper text-ink">
      {/* Upper white editorial copy */}
      <div className="mx-auto grid max-w-report border-b border-ink/10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.38fr_1fr] lg:px-8">
        <aside className="pb-8 lg:pb-0">
          <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink">
            About this store
          </p>
        </aside>

        <div className="border-t border-ink/70 pt-5 lg:max-w-2xl">
          <p className="text-lg leading-8 text-ink">
            Tell20 started with a simple rule: every product should be easy to
            understand, easy to use, and worth recommending. If a piece needs
            too much explanation, it usually does not belong here.
          </p>

          <p className="mt-10 text-lg leading-8 text-ink">
            Our categories are deliberately narrow: wear, carry, footwear, and
            home. That keeps the store focused and gives each item space to
            prove why it is included.
          </p>
        </div>
      </div>

      {/* Black section */}
      <div className="bg-ink px-4 py-14 text-bone sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-report">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_0.95fr_0.65fr]">
            <h2 className="text-balance text-3xl font-black leading-[0.95] tracking-[-0.055em] sm:text-4xl lg:text-5xl">
              Built around{" "}
              <em className="italic text-tell-light">repeat use</em>
            </h2>

            <p className="max-w-md text-base leading-7 text-bone/78">
              Tell20 is shaped by useful shopping habits: fewer choices, clear
              categories, simple checkout, honest returns, and pieces that make
              sense beyond one trend cycle.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/80">
              {supportLinks.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="mt-14 grid max-w-3xl overflow-hidden border border-ink bg-ink lg:ml-[38%] sm:grid-cols-2">
            {valueTiles.map((item) => (
              <article
                key={item.title}
                className="min-h-44 border border-ink bg-tell p-7 text-bone sm:min-h-52"
              >
                <h3 className="text-3xl font-black leading-none tracking-[-0.055em] text-bone">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-xs text-sm leading-6 text-bone/78">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}