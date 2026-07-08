import { useEffect, useRef, useState } from "react";
import AnimatedSection from "../AnimatedSection";
import LogoLockup from "../LogoLockup";
import ProductCard from "../ProductCard";

const shippingNotes = [
  "Free delivery on orders above KSh 15,000.",
  "Wishlist items stay available between visits.",
  "Checkout is protected by OTP sign-in.",
  "Returns are accepted within 14 days."
];

export default function HomeShoppingFlow({ featured }) {
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
          @keyframes shoppingProductIn {
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

          @keyframes shoppingContentIn {
            0% {
              opacity: 0;
              transform: translateY(36px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shoppingNoteIn {
            0% {
              opacity: 0;
              transform: translateY(24px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .shopping-product-reveal {
            opacity: 0;
            transform: translateY(46px) scale(0.96);
          }

          .shopping-content-reveal {
            opacity: 0;
            transform: translateY(36px);
          }

          .shopping-note-reveal {
            opacity: 0;
            transform: translateY(24px);
          }

          .shopping-product-reveal.is-visible {
            animation: shoppingProductIn 850ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .shopping-content-reveal.is-visible {
            animation: shoppingContentIn 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            animation-delay: 120ms;
          }

          .shopping-note-reveal.is-visible {
            animation: shoppingNoteIn 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            animation-delay: var(--delay);
          }

          @media (prefers-reduced-motion: reduce) {
            .shopping-product-reveal,
            .shopping-content-reveal,
            .shopping-note-reveal {
              opacity: 1;
              transform: none;
            }

            .shopping-product-reveal.is-visible,
            .shopping-content-reveal.is-visible,
            .shopping-note-reveal.is-visible {
              animation: none;
            }
          }
        `}
      </style>

      <div
        ref={sectionRef}
        className="mx-auto grid max-w-report gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"
      >
        <div
          className={`shopping-product-reveal ${isVisible ? "is-visible" : ""}`}
        >
          <ProductCard product={featured} featured />
        </div>

        <div
          className={`shopping-content-reveal ${isVisible ? "is-visible" : ""}`}
        >

          <h2 className="mt-8 max-w-4xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl">
            <em className="italic text-tell">Wishlist</em> it,{" "}
            <em className="italic text-tell">cart</em> it, verify once,{" "}
            <em className="italic text-tell">check out</em>.
          </h2>

        </div>
      </div>
    </AnimatedSection>
  );
}