import AnimatedSection from "../AnimatedSection";

export default function HomeClosing() {
  return (
    <AnimatedSection className="relative overflow-hidden bg-ink px-4 py-20 text-bone sm:px-6 sm:py-28 lg:px-8">

      {/* Soft grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "12px 12px"
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[32rem] max-w-report flex-col items-center justify-center text-center">
        <div className="max-w-4xl">
          <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-bone/55">
            Tell20 closing note
          </p>

          <h2 className="text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
            <em className="italic text-tell">Minimal</em> does not mean{" "}
            <em className="italic text-tell">unfinished</em>.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-bone/70">
            It means every product, every card, and every checkout step has to
            earn its place.
          </p>
        </div>

        <form
          className="mt-10 grid w-full max-w-2xl overflow-hidden border border-bone/15 bg-bone text-ink sm:grid-cols-[1fr_auto]"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="closing-email">
            Your email
          </label>

          <input
            id="closing-email"
            type="email"
            placeholder="Your email"
            className="h-16 min-w-0 bg-bone px-5 text-base text-ink outline-none placeholder:text-ink/60"
          />

          <button
            type="submit"
            className="h-16 bg-tell px-8 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
          >
            Submit
          </button>
        </form>

        <p className="mt-5 max-w-xl text-sm leading-6 text-bone/55">
          Join the list for new drops, seasonal edits, and quiet updates from
          Tell20.
        </p>
      </div>
    </AnimatedSection>
  );
}