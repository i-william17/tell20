import { useEffect, useRef, useState } from "react";
import AnimatedSection from "../AnimatedSection";
import ProductCard from "../ProductCard";

export default function HomeNewPieces({ products }) {
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
    <AnimatedSection className="bg-bone px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <style>
        {`
          @keyframes newPiecesHeaderIn {
            0% {
              opacity: 0;
              transform: translateY(36px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes newPiecesProductIn {
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

          .new-pieces-header-reveal {
            opacity: 0;
            transform: translateY(36px);
          }

          .new-pieces-product-reveal {
            opacity: 0;
            transform: translateY(46px) scale(0.96);
          }

          .new-pieces-header-reveal.is-visible {
            animation: newPiecesHeaderIn 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .new-pieces-product-reveal.is-visible {
            animation: newPiecesProductIn 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            animation-delay: var(--delay);
          }

          .new-pieces-product-reveal > * {
            height: 100%;
          }

          @media (prefers-reduced-motion: reduce) {
            .new-pieces-header-reveal,
            .new-pieces-product-reveal {
              opacity: 1;
              transform: none;
            }

            .new-pieces-header-reveal.is-visible,
            .new-pieces-product-reveal.is-visible {
              animation: none;
            }
          }
        `}
      </style>

      <div ref={sectionRef} className="mx-auto max-w-report">
        <div
          className={`new-pieces-header-reveal ${
            isVisible ? "is-visible" : ""
          }`}
        >
          <h2 className="max-w-6xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl lg:text-8xl">
            <em className="italic text-tell">New</em> pieces,{" "}
            <em className="italic text-tell">sharp</em> cards, no{" "}
            <em className="italic text-tell">noise</em>.
          </h2>

          <div className="mt-6 max-w-3xl text-xl leading-8 text-ink/70">
            The edit is intentionally small. Every item has to hold up on its
            own and make sense next to the rest of the store.
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`new-pieces-product-reveal ${
                isVisible ? "is-visible" : ""
              }`}
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