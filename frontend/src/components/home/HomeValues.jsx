import AnimatedSection from "../AnimatedSection";
import Link from "../Link";

const valueBlocks = [
  {
    title: "Fewer, better choices",
    body:
      "The store is edited down to pieces that work across days, seasons, and routines. Nothing is added because a grid needs filling.",
    tone: "dark"
  },
  {
    title: "Useful before decorative",
    body:
      "Every product has to solve a simple problem: carry more, layer better, wear longer, or make a room feel easier to live in.",
    tone: "sage"
  },
  {
    title: "Clear buying, clear returns",
    body:
      "No forced account password, no hidden delivery rule, no unclear return window. The customer should always know what happens next.",
    tone: "tell"
  }
];

const tones = {
  dark: {
    card: "bg-ink text-bone border-bone/10",
    title: "text-bone",
    body: "text-bone/70"
  },
  sage: {
    card: "bg-[#DCE8DD] text-ink border-black/5",
    title: "text-ink",
    body: "text-ink/70"
  },
  bone: {
    card: "bg-bone text-ink border-ink/10",
    title: "text-ink",
    body: "text-ink/70"
  },
  tell: {
    card: "bg-tell text-bone border-tell-deep/10",
    title: "text-bone",
    body: "text-bone/75"
  }
};

export default function HomeValues() {
  return (
    <AnimatedSection className="bg-bone px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-report">
        <h2 className="max-w-6xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
          Built around <em className="italic text-tell">repeat</em> use.
        </h2>

        <div className="mt-10 grid overflow-hidden border border-ink/10 bg-paper lg:grid-cols-3">
          {valueBlocks.map((item) => {
            const tone = tones[item.tone] || tones.bone;

            return (
              <article
                key={item.title}
                className={`min-h-[22rem] border p-6 sm:p-8 lg:min-h-[26rem] ${tone.card}`}
              >
                <h3
                  className={`max-w-sm text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-5xl ${tone.title}`}
                >
                  {item.title}
                </h3>

                <p className={`mt-6 max-w-sm text-base leading-7 ${tone.body}`}>
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>

        <Link
          href="/about"
          className="mt-10 inline-flex rounded-full bg-ink px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
        >
          Read the full story
        </Link>
      </div>
    </AnimatedSection>
  );
}