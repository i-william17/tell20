import { useEffect, useRef, useState } from "react";
import AnimatedSection from "../AnimatedSection";
import ProductCard from "../ProductCard";

export default function HomeFlashSales({ products }) {
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

  if (products.length === 0) return null;

  return (
    <AnimatedSection className="bg-[#E6E6E1] px-4 py-14 text-ink sm:px-6 sm:py-20 lg:px-8">
      <style>
        {`
          @keyframes flashHeaderIn {
            0% {
              opacity: 0;
              transform: translateY(36px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes flashProductIn {
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

          .flash-header-reveal {
            opacity: 0;
            transform: translateY(36px);
          }

          .flash-product-reveal {
            opacity: 0;
            transform: translateY(46px) scale(0.96);
          }

          .flash-header-reveal.is-visible {
            animation: flashHeaderIn 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .flash-product-reveal.is-visible {
            animation: flashProductIn 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            animation-delay: var(--delay);
          }

          .flash-product-reveal > * {
            height: 100%;
          }

          @media (prefers-reduced-motion: reduce) {
            .flash-header-reveal,
            .flash-product-reveal {
              opacity: 1;
              transform: none;
            }

            .flash-header-reveal.is-visible,
            .flash-product-reveal.is-visible {
              animation: none;
            }
          }
        `}
      </style>

      <div ref={sectionRef} className="mx-auto max-w-report">
        <div
          className={`flash-header-reveal grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end ${
            isVisible ? "is-visible" : ""
          }`}
        >
          <h2 className="max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl">
            <em className="italic text-tell">Flash</em> sales on{" "}
            <em className="italic text-tell">pieces</em> people already keep{" "}
            <em className="italic text-tell">coming back</em> to.
          </h2>

          <p className="max-w-2xl text-lg leading-8 text-ink/70 lg:justify-self-end">
            Sale prices are live until the listed stock clears or the sale
            window closes. Prices are in Kenyan shillings and checkout stays
            OTP-protected.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`flash-product-reveal ${isVisible ? "is-visible" : ""}`}
              style={{
                "--delay": `${index * 120}ms`
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}