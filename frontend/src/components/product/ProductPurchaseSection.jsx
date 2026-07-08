import { useEffect, useMemo, useState } from "react";
import Money from "../Money";

const shippingNotes = [
  "Free delivery on orders above KSh 15,000.",
  "Wishlist items stay available between visits.",
  "Checkout is protected by OTP sign-in.",
  "Returns are accepted within 14 days."
];

const detailItems = (product) => [
  ["Material", product.material],
  ["Fit", product.fit],
  ["Stock", `${product.stock} left`],
  ["SKU", product.sku],
  ["Origin", product.origin],
  ["Delivery", product.deliveryWindow]
];

const noteTones = [
  "bg-ink text-bone",
  "bg-[#DCE8DD] text-ink",
  "bg-tell text-bone",
  "bg-bone text-ink"
];

export default function ProductPurchaseSection({
  addToCart,
  isWished,
  product,
  selectedSize,
  setSelectedSize,
  toggleWishlist
}) {
  const galleryImages = useMemo(() => {
    const images = product.images?.length ? product.images : [product.image];
    const safeImages = [...images];

    while (safeImages.length < 3) {
      safeImages.push(product.image);
    }

    return safeImages.slice(0, 3);
  }, [product.images, product.image]);

  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  const isSale = product.compareAtPrice && product.compareAtPrice > product.price;

  const saleEnds = product.saleEnds
    ? new Intl.DateTimeFormat("en-KE", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(product.saleEnds))
    : "";

  useEffect(() => {
    setActiveImage(galleryImages[0]);
  }, [galleryImages, product.id]);

  return (
    <section className="overflow-hidden bg-paper text-ink">
      <div className="grid border-b border-ink/10 lg:grid-cols-[0.46fr_0.54fr]">
        <div className="border-b border-ink/10 bg-bone px-4 py-6 sm:px-6 sm:py-8 lg:border-b-0 lg:border-r lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="overflow-hidden border border-ink/10 bg-paper">
              <img
                src={activeImage}
                alt={product.name}
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[1/1]"
              />
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2">
              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`overflow-hidden border bg-paper transition ${
                    activeImage === image
                      ? "border-tell"
                      : "border-ink/12 hover:border-tell/60"
                  }`}
                  aria-label={`View ${product.name} image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
              <span>{product.category}</span>
              <span>
                Rated {product.rating.toFixed(1)} / {product.reviewCount} reviews
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-black leading-[0.9] tracking-[-0.065em] sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <p className="text-3xl font-black tracking-[-0.055em] sm:text-4xl">
                <Money value={product.price} />
              </p>

              {isSale && (
                <>
                  <p className="font-mono text-sm uppercase tracking-[0.14em] text-muted line-through">
                    <Money value={product.compareAtPrice} />
                  </p>

                  <p className="rounded-full bg-tell px-4 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-bone">
                    Flash sale ends {saleEnds}
                  </p>
                </>
              )}
            </div>

            <p className="mt-5 max-w-2xl text-lg leading-7 text-ink/70">
              {product.description}
            </p>

            <div className="mt-6 grid overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {detailItems(product).map(([label, value], index) => (
                <div
                  key={label}
                  className={`border border-ink/10 p-3 ${
                    index === 0
                      ? "bg-ink text-bone"
                      : index === 1
                        ? "bg-[#DCE8DD] text-ink"
                        : index === 2
                          ? "bg-tell text-bone"
                          : "bg-bone text-ink"
                  }`}
                >
                  <p
                    className={`font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] ${
                      index === 0 || index === 2 ? "text-bone/60" : "text-ink/50"
                    }`}
                  >
                    {label}
                  </p>

                  <p
                    className={`mt-2 text-xs leading-5 ${
                      index === 0 || index === 2 ? "text-bone/75" : "text-ink/72"
                    }`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border border-ink/10 bg-bone p-4 sm:p-5">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">
                Select size
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedSize(item)}
                    className={`min-w-12 rounded-full border px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.14em] transition ${
                      selectedSize === item
                        ? "border-ink bg-ink text-bone"
                        : "border-ink/15 bg-paper text-ink hover:border-tell hover:text-tell-deep"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
              <button
                type="button"
                onClick={() => {
                  addToCart(product.id, 1, selectedSize);
                  window.dispatchEvent(
                    new CustomEvent("tell20:open-sidebar", { detail: "cart" })
                  );
                }}
                className="rounded-full bg-tell px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
              >
                Add to cart
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`rounded-full border px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] transition ${
                  isWished
                    ? "border-tell bg-tell-soft text-tell-deep"
                    : "border-ink/15 bg-bone text-ink hover:border-tell hover:text-tell-deep"
                }`}
              >
                {isWished ? "Saved" : "Add to wishlist"}
              </button>
            </div>

            <div className="mt-6 grid overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2">
              {shippingNotes.map((note, index) => (
                <p
                  key={note}
                  className={`border border-ink/10 p-4 text-xs leading-5 ${
                    noteTones[index % noteTones.length]
                  } ${
                    index === 0 || index === 2 ? "text-bone/75" : "text-ink/70"
                  }`}
                >
                  {note}
                </p>
              ))}
            </div>

            <div className="mt-6 overflow-hidden border border-ink/10 bg-paper">
              <div className="bg-ink p-4 text-bone">
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/50">
                  Care and delivery
                </p>

                <h2 className="mt-2 text-2xl font-black leading-[0.95] tracking-[-0.05em]">
                  Keep it <em className="italic text-tell-light">useful</em>.
                </h2>
              </div>

              <div className="grid gap-3 bg-bone p-4 text-xs leading-5 text-ink/70">
                <p>
                  Wash cold, dry flat, and avoid bleach. For footwear and bags,
                  wipe clean with a damp cloth.
                </p>

                <p>
                  {product.deliveryWindow}. Returns are accepted within{" "}
                  {product.returnWindow}.
                </p>

                <p>
                  {product.warranty} applies from the date your Tell20 order is
                  delivered.
                </p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden border border-ink/10 bg-bone">
              <div className="bg-tell p-4 text-bone">
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/65">
                  Product data
                </p>

                <h2 className="mt-2 text-2xl font-black leading-[0.95] tracking-[-0.05em]">
                  Details that help you decide.
                </h2>
              </div>

              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-ink/12 bg-paper px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid gap-2 text-xs leading-5 text-ink/70 sm:grid-cols-2">
                  <p>Vendor: {product.vendor}</p>
                  <p>Subcategory: {product.subcategory}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
