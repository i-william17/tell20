const openSidebar = (panel) => {
  window.dispatchEvent(new CustomEvent("tell20:open-sidebar", { detail: panel }));
};

export default function AccountActions({ onLogout }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => openSidebar("cart")}
        className="rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone"
      >
        View cart
      </button>
      <button
        type="button"
        onClick={() => openSidebar("wishlist")}
        className="rounded-full border border-ink/15 px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink"
      >
        View wishlist
      </button>
      <button
        type="button"
        onClick={onLogout}
        className="rounded-full border border-ink/15 px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink"
      >
        Sign out
      </button>
    </div>
  );
}
