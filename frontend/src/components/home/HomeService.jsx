import { useEffect, useRef, useState } from "react";
import AnimatedSection from "../AnimatedSection";

const serviceCards = [
  {
    title: "Delivery",
    body:
      "Standard delivery is calculated at checkout. Orders above KSh 15,000 ship free. Most orders leave the studio within two working days.",
    tone: "dark"
  },
  {
    title: "Returns",
    body:
      "Unworn items can be returned within 14 days. Keep the original packaging and start the return from your order email.",
    tone: "sage"
  },
  {
    title: "Payments",
    body:
      "Checkout is guarded by OTP verification before payment details are requested. This keeps the flow passwordless and secure.",
    tone: "bone"
  },
  {
    title: "Support",
    body:
      "For fit, sizing, delivery, or order questions, contact support@tell20.store. We aim to reply within one business day.",
    tone: "tell"
  }
];

const tones = {
  dark: {
    card: "bg-ink text-bone border-bone/10",
    title: "text-bone",
    body: "text-bone/70",
    number: "text-bone/35"
  },
  sage: {
    card: "bg-[#DCE8DD] text-ink border-black/5",
    title: "text-ink",
    body: "text-ink/70",
    number: "text-black/20"
  },
  bone: {
    card: "bg-bone text-ink border-ink/10",
    title: "text-ink",
    body: "text-ink/70",
    number: "text-ink/18"
  },
  tell: {
    card: "bg-tell text-bone border-tell-deep/10",
    title: "text-bone",
    body: "text-bone/75",
    number: "text-bone/35"
  }
};

export default function HomeService() {
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
    <AnimatedSection className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <style>
        {`
          @keyframes serviceHeaderIn {
            0% {
              opacity: 0;
              transform: translateY(36px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes serviceCardIn {
            0% {
              opacity: 0;
              transform: translateY(46px) scale(0.96);
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

          .service-header-reveal {
            opacity: 0;
            transform: translateY(36px);
          }

          .service-card-reveal {
            opacity: 0;
            transform: translateY(46px) scale(0.96);
          }

          .service-header-reveal.is-visible {
            animation: serviceHeaderIn 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .service-card-reveal.is-visible {
            animation: serviceCardIn 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            animation-delay: var(--delay);
          }

          @media (prefers-reduced-motion: reduce) {
            .service-header-reveal,
            .service-card-reveal {
              opacity: 1;
              transform: none;
            }

            .service-header-reveal.is-visible,
            .service-card-reveal.is-visible {
              animation: none;
            }
          }
        `}
      </style>

      <div ref={sectionRef} className="mx-auto max-w-report">
        <div
          className={`service-header-reveal ${
            isVisible ? "is-visible" : ""
          }`}
        >
          <h2 className="max-w-5xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl">
            <em className="italic text-tell">Service</em> should be as{" "}
            <em className="italic text-tell">simple</em> as the{" "}
            <em className="italic text-tell">product</em>.
          </h2>
        </div>

        <div className="mt-10 grid overflow-hidden border border-ink/10 bg-paper md:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((item, index) => {
            const tone = tones[item.tone] || tones.bone;

            return (
              <article
                key={item.title}
                className={`service-card-reveal relative min-h-[22rem] overflow-hidden border p-6 sm:p-7 ${tone.card} ${
                  isVisible ? "is-visible" : ""
                }`}
                style={{
                  "--delay": `${index * 130}ms`
                }}
              >
                <p
                  className={`absolute right-5 top-4 text-7xl font-black leading-none tracking-[-0.08em] ${tone.number}`}
                >
                  0{index + 1}
                </p>

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <h3
                    className={`max-w-xs text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-5xl ${tone.title}`}
                  >
                    {item.title}
                  </h3>

                  <p className={`mt-8 max-w-sm text-sm leading-6 ${tone.body}`}>
                    {item.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}