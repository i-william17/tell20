import { useEffect, useRef, useState } from "react";
import AnimatedSection from "../AnimatedSection";

const aboutImages = {
  packing:
    "https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&w=1600&q=85"
};

const serviceCards = [
  {
    label: "01",
    title: "Delivery",
    body:
      "Standard delivery is calculated at checkout. Orders above KSh 15,000 ship free. Most orders leave the studio within two working days.",
    tone: "dark"
  },
  {
    label: "02",
    title: "Returns",
    body:
      "Unworn items can be returned within 14 days. Keep the original packaging and start the return from your order email.",
    tone: "sage"
  },
  {
    label: "03",
    title: "Payments",
    body:
      "Checkout is guarded by OTP verification before payment details are requested. This keeps the flow passwordless and secure.",
    tone: "bone"
  },
  {
    label: "04",
    title: "Support",
    body:
      "For fit, sizing, delivery, or order questions, contact support@tell20.store. We aim to reply within one business day.",
    tone: "tell"
  }
];

const tones = {
  dark: {
    card: "bg-ink text-bone border-bone/10",
    label: "text-bone/45",
    title: "text-bone",
    body: "text-bone/70"
  },
  sage: {
    card: "bg-[#DCE8DD] text-ink border-black/5",
    label: "text-ink/45",
    title: "text-ink",
    body: "text-ink/72"
  },
  bone: {
    card: "bg-bone text-ink border-ink/10",
    label: "text-ink/45",
    title: "text-ink",
    body: "text-ink/70"
  },
  tell: {
    card: "bg-tell text-bone border-tell-deep/10",
    label: "text-bone/55",
    title: "text-bone",
    body: "text-bone/78"
  }
};

export default function AboutService() {
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
    <AnimatedSection className="overflow-hidden bg-bone text-ink">
      <style>
        {`
          @keyframes aboutServiceHeaderIn {
            0% {
              opacity: 0;
              transform: translateY(38px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes aboutServiceImageIn {
            0% {
              opacity: 0;
              transform: translateX(42px) scale(0.96);
            }

            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes aboutServiceCardIn {
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

          .about-service-header-reveal {
            opacity: 0;
            transform: translateY(38px);
          }

          .about-service-image-reveal {
            opacity: 0;
            transform: translateX(42px) scale(0.96);
          }

          .about-service-card-reveal {
            opacity: 0;
            transform: translateY(44px) scale(0.96);
          }

          .about-service-header-reveal.is-visible {
            animation: aboutServiceHeaderIn 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .about-service-image-reveal.is-visible {
            animation: aboutServiceImageIn 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            animation-delay: 120ms;
          }

          .about-service-card-reveal.is-visible {
            animation: aboutServiceCardIn 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            animation-delay: var(--delay);
          }

          @media (prefers-reduced-motion: reduce) {
            .about-service-header-reveal,
            .about-service-image-reveal,
            .about-service-card-reveal {
              opacity: 1;
              transform: none;
            }

            .about-service-header-reveal.is-visible,
            .about-service-image-reveal.is-visible,
            .about-service-card-reveal.is-visible {
              animation: none;
            }
          }
        `}
      </style>

      <div ref={sectionRef} className="mx-auto max-w-report px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid overflow-hidden border border-ink/10 bg-paper lg:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-ink/10 lg:border-b-0 lg:border-r">
            <div
              className={`about-service-header-reveal grid gap-8 border-b border-ink/10 px-6 py-8 sm:px-8 lg:grid-cols-[0.35fr_1fr] lg:py-10 ${
                isVisible ? "is-visible" : ""
              }`}
            >
              <div>
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink">
                  Service promise
                </p>
              </div>

              <div>
                <h2 className="max-w-5xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl">
                  <em className="italic text-tell">Delivery</em>, returns, and{" "}
                  <em className="italic text-tell">support</em> should be plain.
                </h2>

                <p className="mt-8 max-w-xl text-lg leading-8 text-ink/70">
                  Tell20 keeps the buying process clear: quick dispatch, simple
                  return rules, secure OTP checkout, and support that answers
                  directly.
                </p>
              </div>
            </div>

            <div className="grid overflow-hidden bg-ink/10 sm:grid-cols-2">
              {serviceCards.map((card, index) => {
                const tone = tones[card.tone] || tones.bone;

                return (
                  <article
                    key={card.title}
                    className={`about-service-card-reveal min-h-[20rem] border p-6 sm:p-8 ${tone.card} ${
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
                        {card.label}
                      </p>

                      <div className="mt-12">
                        <h3
                          className={`text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-5xl ${tone.title}`}
                        >
                          {card.title}
                        </h3>

                        <p className={`mt-6 max-w-sm text-sm leading-6 ${tone.body}`}>
                          {card.body}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div
            className={`about-service-image-reveal relative min-h-[28rem] overflow-hidden bg-ink lg:min-h-full ${
              isVisible ? "is-visible" : ""
            }`}
          >
            <img
              src={aboutImages.packing}
              alt="Packing online orders"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-ink/20" />

            <div className="absolute bottom-0 left-0 right-0 border-t border-bone/15 bg-ink/75 p-6 text-bone backdrop-blur-sm">
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/55">
                Order flow
              </p>

              <p className="mt-4 max-w-sm text-3xl font-black leading-[0.95] tracking-[-0.06em]">
                Pack clearly. Dispatch quickly. Support simply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}