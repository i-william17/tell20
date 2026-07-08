import { useEffect, useRef, useState } from "react";
import AnimatedSection from "../AnimatedSection";
import StatCard from "../StatCard";

const storeStats = [
  {
    value: "20",
    label: "Curated essentials",
    note: "A focused edit of products worth buying, using, and recommending.",
    tone: "dark",
    dark: true
  },
  {
    value: "48h",
    label: "Fast dispatch",
    note: "Orders are processed within two days so your items move quickly.",
    tone: "sage",
    dark: false
  },
  {
    value: "14d",
    label: "Easy returns",
    note: "A simple return window for items that do not fit or work for you.",
    tone: "bone",
    dark: false
  },
  {
    value: "OTP",
    label: "Secure checkout",
    note: "Passwordless verification keeps checkout simple, quick, and protected.",
    tone: "tell",
    dark: false
  }
];

export default function HomeStats() {
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
        threshold: 0.25
      }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatedSection className="py-0">
      <style>
        {`
          @keyframes statCardIn {
            0% {
              opacity: 0;
              transform: translateY(42px) scale(0.96);
            }

            70% {
              opacity: 1;
              transform: translateY(-4px) scale(1.01);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .stat-card-reveal {
            opacity: 0;
            transform: translateY(42px) scale(0.96);
          }

          .stat-card-reveal.is-visible {
            animation: statCardIn 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            animation-delay: var(--delay);
          }

          .stat-card-reveal > article {
            height: 100%;
          }

          @media (prefers-reduced-motion: reduce) {
            .stat-card-reveal {
              opacity: 1;
              transform: none;
            }

            .stat-card-reveal.is-visible {
              animation: none;
            }
          }
        `}
      </style>

      <div ref={sectionRef} className="mx-auto max-w-report px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden border border-ink/10 bg-paper md:grid-cols-2 lg:grid-cols-4">
          {storeStats.map((item, index) => (
            <div
              key={item.label}
              className={`stat-card-reveal ${isVisible ? "is-visible" : ""}`}
              style={{
                "--delay": `${index * 130}ms`
              }}
            >
              <StatCard
                value={item.value}
                label={item.label}
                note={item.note}
                tone={item.tone}
                dark={item.dark}
              />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}