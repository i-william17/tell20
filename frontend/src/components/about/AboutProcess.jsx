import AnimatedSection from "../AnimatedSection";

const processSteps = [
  {
    title: "Source",
    body:
      "We choose materials with a bias toward durability, repairability, and repeat use. Fabrics are selected for hand feel and daily wear, not showroom novelty."
  },
  {
    title: "Edit",
    body:
      "Each drop is intentionally small. Products are reviewed against use cases, not trend decks, so the store stays readable and easy to shop."
  },
  {
    title: "Ship",
    body:
      "Orders are packed with minimal inserts and dispatched inside a 48 hour working window. Returns are inspected quickly so customers are not left waiting."
  }
];

export default function AboutProcess() {
  return (
    <AnimatedSection className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-report">
        <h2 className="max-w-5xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl">
          How a product reaches the store.
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden border border-ink/12 bg-ink/12 lg:grid-cols-3">
          {processSteps.map((step) => (
            <article key={step.title} className="bg-bone p-6 sm:p-8">
              <h3 className="text-4xl font-black tracking-[-0.055em]">{step.title}</h3>
              <p className="mt-6 text-base leading-7 text-ink/70">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
