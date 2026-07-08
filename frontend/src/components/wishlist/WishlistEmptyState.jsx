import Link from "../Link";

export default function WishlistEmptyState() {
  return (
    <div className="mt-10 border border-ink/12 bg-bone p-8">
      <p className="max-w-xl text-xl leading-8 text-ink/70">
        Your wishlist is empty. Save pieces while browsing and come back when the cart needs editing.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-flex rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone"
      >
        Browse shop
      </Link>
    </div>
  );
}
