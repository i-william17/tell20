import { useEffect, useRef, useState } from "react";
import AnimatedSection from "../AnimatedSection";

const positionBlocks = [
  {
    label: "01",
    title: "Small edit",
    body:
      "A small edit forces better decisions. It makes buying faster, returns lower, and product quality easier to inspect.",
    tone: "dark"
  },
  {
    label: "02",
    title: "No endless variants",
    body:
      "Tell20 avoids endless variants. The product has to carry its weight in the system before it reaches the shelf.",
    tone: "tell"
  },
  {
    label: "03",
    title: "Less waste",
    body:
      "The goal is not minimalism as a style. The goal is less waste, less confusion, and more things people actually keep using.",
    tone: "sage"
  }
];

const tones = {
  dark: {
    card: "bg-ink text-bone border-bone/15",
    label: "text-bone/45",
    title: "text-bone",
    body: "text-bone/72"
  },
  tell: {
    card: "bg-tell text-bone border-tell-deep/20",
    label: "text-bone/55",
    title: "text-bone",
    body: "text-bone/78"
  },
  sage: {
    card: "bg-[#DCE8DD] text-ink border-black/5",
    label: "text-ink/45",
    title: "text-ink",
    body: "text-ink/72"
  }
};

export default function AboutPositioning() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2
      }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatedSection className="overflow-hidden bg-ink text-bone">
      <style>
        {`
          @keyframes positioningHeaderIn {
            0% {
              opacity: 0;
              transform: translateY(38px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes positioningCardIn {
            0% {
              opacity: 0;
              transform: translateY(44px) scale(0.96);
            }

            70% {
              opacity: 1;
              transform: translateY(-5px) scale(1.01);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .positioning-header-reveal {
            opacity: 0;
            transform: translateY(38px);
          }

          .positioning-card-reveal {
            opacity: 0;
            transform: translateY(44px) scale(0.96);
          }

          .positioning-header-reveal.is-visible {
            animation: positioningHeaderIn 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .positioning-card-reveal.is-visible {
            animation: positioningCardIn 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            animation-delay: var(--delay);
          }

          @media (prefers-reduced-motion: reduce) {
            .positioning-header-reveal,
            .positioning-card-reveal {
              opacity: 1;
              transform: none;
            }

            .positioning-header-reveal.is-visible,
            .positioning-card-reveal.is-visible {
              animation: none;
            }
          }
        `}
      </style>

      <div ref={sectionRef} className="mx-auto max-w-report px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div
          className={`positioning-header-reveal grid gap-10 border-b border-bone/15 pb-12 lg:grid-cols-[0.35fr_1fr] ${
            isVisible ? "is-visible" : ""
          }`}
        >
          <div className="flex flex-col justify-between">
            <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/45">
              Tell20 position
            </p>

            <p className="mt-16 hidden font-mono text-[0.68rem] uppercase tracking-[0.14em] text-bone/45 lg:block">
              Useful over average
            </p>
          </div>

          <h2 className="max-w-6xl text-balance text-5xl font-black leading-[0.88] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
            We would rather{" "}
            <em className="italic text-tell-light">sell out</em> of a useful
            thing than keep adding{" "}
            <em className="italic text-tell-light">average</em> ones.
          </h2>
        </div>

        <div className="grid border-b border-bone/15 lg:grid-cols-[0.35fr_1fr]">
          <aside className="hidden border-r border-bone/15 py-10 lg:block">
            <p className="max-w-xs text-sm leading-6 text-bone/55">
              Every item has to justify its place before it reaches the store.
              The edit stays small so the customer can choose clearly.
            </p>
          </aside>

          <div className="grid overflow-hidden border-x border-bone/15 bg-bone/10 md:grid-cols-3 lg:border-l-0">
            {positionBlocks.map((item, index) => {
              const tone = tones[item.tone] || tones.dark;

              return (
                <article
                  key={item.title}
                  className={`positioning-card-reveal min-h-[22rem] border border-bone/10 p-6 sm:p-8 ${tone.card} ${
                    isVisible ? "is-visible" : ""
                  }`}
                  style={{
                    "--delay": `${180 + index * 130}ms`
                  }}
                >
                  <div className="flex h-full flex-col justify-between">
                    <p
                      className={`font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] ${tone.label}`}
                    >
                      {item.label}
                    </p>

                    <div className="mt-12">
                      <h3
                        className={`max-w-xs text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-5xl ${tone.title}`}
                      >
                        {item.title}
                      </h3>

                      <p className={`mt-6 max-w-sm text-base leading-7 ${tone.body}`}>
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}