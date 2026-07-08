import { useEffect, useMemo, useState } from "react";
import Link from "../Link";

// import localHeroOne from "../../assets/home/shopping-bags.jpg";
// import localHeroTwo from "../../assets/home/store-rack.jpg";
// import localHeroThree from "../../assets/home/checkout-counter.jpg";
// import localHeroFour from "../../assets/home/delivery-boxes.jpg";
// import localHeroFive from "../../assets/home/wishlist-edit.jpg";
// import localHeroSix from "../../assets/home/shop-window.jpg";

const visibleTileCount = 6;

const shoppingImages = [
  {
    id: "store-front",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85",
    alt: "Well curated retail store with clothing racks and warm shelving",
    label: "Curated store edit"
  },
  {
    id: "shopping-bags",
    src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=85",
    alt: "Customer walking through a shopping street with bags",
    label: "Wishlist to cart"
  },
  {
    id: "daily-style",
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    alt: "Daily outfit styling with clean fashion pieces",
    label: "Repeat wear"
  },
  {
    id: "soft-rack",
    src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=85",
    alt: "Neutral shirts arranged on a retail rack",
    label: "New pieces"
  },
  {
    id: "checkout",
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
    alt: "Online checkout and card payment at a desk",
    label: "Secure checkout"
  },
  {
    id: "shop-window",
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
    alt: "Customer browsing fashion pieces in a bright store",
    label: "Store finds"
  },
  {
    id: "packed-orders",
    src: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=85",
    alt: "Packed shopping order ready for delivery",
    label: "Ready to deliver"
  },
  {
    id: "shopping-edit",
    src: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=85",
    alt: "Retail shopping bags and selected store pieces",
    label: "Edited selection"
  }
];

const shuffleImages = (items) => {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
};

const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];

const getInitialTileImages = () => shuffleImages(shoppingImages).slice(0, visibleTileCount);

const getReplacementImage = (currentImages, tileIndex) => {
  const visibleIds = new Set(currentImages.map((image) => image.id));
  const unusedImages = shoppingImages.filter((image) => !visibleIds.has(image.id));
  const fallbackImages = shoppingImages.filter((image) => image.id !== currentImages[tileIndex].id);
  const candidates = unusedImages.length > 0 ? unusedImages : fallbackImages;

  return getRandomItem(candidates);
};

export default function HomeHero() {
  const initialImages = useMemo(getInitialTileImages, []);
  const [tileImages, setTileImages] = useState(initialImages);

  useEffect(() => {
    let previousTileIndex = -1;

    const timer = window.setInterval(() => {
      setTileImages((current) => {
        const availableTileIndexes = current
          .map((_, index) => index)
          .filter((index) => index !== previousTileIndex);
        const tileIndex = getRandomItem(availableTileIndexes);
        const replacementImage = getReplacementImage(current, tileIndex);
        const next = [...current];

        previousTileIndex = tileIndex;
        next[tileIndex] = replacementImage;

        return next;
      });
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-4.25rem)] overflow-hidden bg-paper text-ink">
      <style>
        {`
      @keyframes puzzleIn {
        0% {
          opacity: 0;
          transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(0.96);
        }
        70% {
          opacity: 1;
          transform: translate(0, 0) rotate(0deg) scale(1.015);
        }
        100% {
          opacity: 1;
          transform: translate(0, 0) rotate(0deg) scale(1);
        }
      }

      @keyframes imageSwap {
        0% {
          opacity: 0.92;
          filter: brightness(0.96) saturate(0.96);
          transform: scale(1.012);
        }
        100% {
          opacity: 1;
          filter: brightness(1) saturate(1);
          transform: scale(1);
        }
      }

      .puzzle-tile {
        opacity: 0;
        animation: puzzleIn 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        animation-delay: var(--delay);
        will-change: transform, opacity;
      }

      .hero-image-swap {
        animation: imageSwap 1200ms cubic-bezier(0.22, 1, 0.36, 1) both;
        transform-origin: center;
      }

      @media (prefers-reduced-motion: reduce) {
        .puzzle-tile,
        .hero-image-swap {
          opacity: 1;
          animation: none;
          transform: none;
        }
      }
    `}
      </style>

      <div className="grid h-[44vh] min-h-[20rem] grid-cols-12 overflow-hidden border-b border-ink/10">
        <div
          className="puzzle-tile col-span-4 overflow-hidden border-r border-paper"
          style={{
            "--x": "-90px",
            "--y": "45px",
            "--r": "-3deg",
            "--delay": "0ms"
          }}
        >
          <img key={tileImages[0].id} src={tileImages[0].src} alt={tileImages[0].alt} className="hero-image-swap h-full w-full object-cover" />
        </div>

        <div className="col-span-2 grid grid-rows-2 border-r border-paper">
          <div
            className="puzzle-tile overflow-hidden border-b border-paper"
            style={{
              "--x": "30px",
              "--y": "-80px",
              "--r": "2.5deg",
              "--delay": "120ms"
            }}
          >
            <img key={tileImages[1].id} src={tileImages[1].src} alt="" className="hero-image-swap h-full w-full object-cover grayscale" />
          </div>

          <div
            className="puzzle-tile overflow-hidden"
            style={{
              "--x": "-40px",
              "--y": "90px",
              "--r": "-2deg",
              "--delay": "220ms"
            }}
          >
            <img key={tileImages[2].id} src={tileImages[2].src} alt="" className="hero-image-swap h-full w-full object-cover" />
          </div>
        </div>

        <div
          className="puzzle-tile col-span-3 overflow-hidden border-r border-paper bg-bone"
          style={{
            "--x": "75px",
            "--y": "35px",
            "--r": "3deg",
            "--delay": "300ms"
          }}
        >
          <img key={tileImages[3].id} src={tileImages[3].src} alt="" className="hero-image-swap h-full w-full object-cover opacity-85" />
        </div>

        <div className="col-span-3 grid grid-rows-[0.55fr_0.45fr]">
          <div
            className="puzzle-tile overflow-hidden border-b border-paper"
            style={{
              "--x": "90px",
              "--y": "-55px",
              "--r": "-2.5deg",
              "--delay": "420ms"
            }}
          >
            <img key={tileImages[4].id} src={tileImages[4].src} alt="" className="hero-image-swap h-full w-full object-cover" />
          </div>

          <div
            className="puzzle-tile overflow-hidden"
            style={{
              "--x": "55px",
              "--y": "75px",
              "--r": "2deg",
              "--delay": "540ms"
            }}
          >
            <img key={tileImages[5].id} src={tileImages[5].src} alt="" className="hero-image-swap h-full w-full object-cover grayscale" />
          </div>
        </div>
      </div>

      {/* Editorial content */}
      <div className="grid min-h-[calc(56vh-4.25rem)] border-b border-ink/10 lg:grid-cols-[0.42fr_1fr]">
        <aside className="flex flex-col justify-between border-b border-ink/10 px-4 py-5 sm:px-6 lg:border-b-0 lg:border-r lg:px-8">
          <p className="max-w-sm text-lg leading-6 tracking-[-0.04em] text-ink">
            Everyday pieces selected for repeat wear, practical use, and easy recommendations.
          </p>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
              >
                Shop now
              </Link>
            </div>

            <div className="font-mono text-xs uppercase tracking-[0.14em] text-ink/70">
              START SHOPPING &darr;
            </div>
          </div>

          <div className="mt-12 hidden font-mono text-[0.68rem] uppercase leading-4 tracking-[0.06em] text-ink/75 lg:block">
            <p>By Tell20</p>
            <p>Shop plenty</p>
            <p>Tell twenty</p>
          </div>
        </aside>

        <div className="flex flex-col justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="max-w-6xl text-balance text-[4.6rem] font-black leading-[0.85] tracking-[-0.085em] sm:text-[6.8rem] lg:text-[9.3rem] xl:text-[10.8rem]">
              <em className="italic text-tell">Shop</em> what you{" "}
              <em className="italic text-tell">love</em> . Tell{" "}
              <em className="italic text-tell">twenty</em>.
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-8 text-ink/68">
              A quiet online store for pieces that earn repeat wear: shirts, bags, sneakers, home goods, and daily essentials with a reason to exist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
