import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "./Link";
import Money from "./Money";
import LogoutConfirmModal from "./modals/LogoutConfirmModal";
import { useShop } from "../context/ShopContext";
import { shopCategories } from "../data/shopCategories";

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Cart", href: "/cart" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

const accountMenuItems = [
  { label: "Profile", href: "/account/profile" },
  { label: "Orders", href: "/account/orders" },
  { label: "Support", href: "/support" }
];

const getSearchTerm = (search) =>
  new URLSearchParams(search).get("search") || "";

const getProductSearchText = (product) =>
  [
    product.name,
    product.sku,
    product.category,
    product.subcategory,
    product.color,
    product.material,
    product.materialType,
    product.vendor,
    product.description,
    ...product.tags
  ]
    .join(" ")
    .toLowerCase();

function HeaderSearch({ id, className = "" }) {
  const { navigate, path, products, search } = useShop();
  const rootRef = useRef(null);
  const [term, setTerm] = useState(() => getSearchTerm(search));
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  useEffect(() => {
    const nextTerm = getSearchTerm(search);
    setTerm(nextTerm);
    setDebouncedTerm(nextTerm);
  }, [search]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedTerm(term), 220);
    return () => window.clearTimeout(timer);
  }, [term]);

  useEffect(() => {
    if (!isResultsOpen) return undefined;

    const onMouseDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsResultsOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsResultsOpen(false);
      }
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isResultsOpen]);

  const normalizedTerm = debouncedTerm.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!normalizedTerm) return [];

    return products.filter((product) =>
      getProductSearchText(product).includes(normalizedTerm)
    );
  }, [normalizedTerm, products]);

  const visibleResults = matches.slice(0, 6);
  const remainingResults = Math.max(matches.length - visibleResults.length, 0);
  const hasSearchTerm = term.trim().length > 0;

  const runSearch = useCallback(() => {
    const trimmed = term.trim();

    navigate(trimmed ? `/shop?search=${encodeURIComponent(trimmed)}` : "/shop", {
      replace: path === "/shop"
    });
    setIsResultsOpen(false);
  }, [navigate, path, term]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <form
        className="grid w-full grid-cols-[1fr_auto] overflow-hidden rounded-full border border-ink/12 bg-bone shadow-rail focus-within:border-tell"
        onSubmit={(event) => {
          event.preventDefault();
          runSearch();
        }}
      >
        <label className="sr-only" htmlFor={id}>
          Search Tell20
        </label>

        <input
          id={id}
          type="search"
          value={term}
          onFocus={() => setIsResultsOpen(term.trim().length > 0)}
          onChange={(event) => {
            const value = event.target.value;
            setTerm(value);
            setIsResultsOpen(value.trim().length > 0);
          }}
          placeholder="Search linen, tote, sneaker..."
          className="h-12 min-w-0 bg-transparent px-5 text-sm outline-none placeholder:text-muted/65"
        />

        <button
          type="submit"
          className="border-l border-ink/10 px-5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-tell-deep transition hover:bg-tell-soft"
        >
          Search
        </button>
      </form>

      {isResultsOpen && hasSearchTerm && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-[80] overflow-hidden border border-ink/12 bg-paper shadow-panel"
          role="dialog"
          aria-label="Search results"
        >
          <div className="border-b border-ink/10 px-4 py-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
              Results for "{term.trim()}"
            </p>
          </div>

          <div className="max-h-[28rem] overflow-y-auto bg-ink/12">
            {visibleResults.length > 0 ? (
              <div className="grid gap-px">
                {visibleResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={() => setIsResultsOpen(false)}
                    className="grid grid-cols-[4rem_1fr_auto] gap-3 bg-bone p-3 transition hover:bg-tell-soft"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square w-16 object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-mono text-[0.62rem] uppercase tracking-[0.13em] text-muted">
                        {product.category} / {product.sku}
                      </span>
                      <span className="mt-1 block truncate text-xl font-black leading-none tracking-[-0.04em] text-ink">
                        {product.name}
                      </span>
                      <span className="mt-2 block truncate text-xs leading-5 text-ink/65">
                        Rated {product.rating.toFixed(1)} from {product.reviewCount} reviews
                      </span>
                    </span>
                    <span className="whitespace-nowrap text-right text-sm font-black tracking-[-0.025em] text-ink">
                      <Money value={product.price} />
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-bone p-5">
                <p className="text-sm leading-6 text-ink/70">
                  No products match that search yet. Try a material, category, SKU, or color.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 bg-paper px-4 py-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
              {matches.length} matching products{remainingResults > 0 ? `, ${remainingResults} more in shop` : ""}
            </p>
            <button
              type="button"
              onClick={runSearch}
              className="rounded-full bg-tell px-5 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-bone transition hover:bg-tell-deep"
            >
              Search shop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function HeaderCategories() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onMouseDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-ink/70 transition hover:bg-tell-soft hover:text-tell-deep"
        aria-expanded={isOpen}
      >
        Categories
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 transition ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 7.5 5 5 5-5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-[85] w-[42rem] max-w-[calc(100vw-2rem)] pt-3">
          <div className="border border-ink/12 bg-paper p-2 shadow-panel">
            <div className="grid max-h-[24rem] grid-cols-4 gap-px overflow-y-auto bg-ink/12">
            {shopCategories.map((category) => (
              <Link
                key={category.label}
                href={`/shop?category=${encodeURIComponent(category.label)}`}
                onClick={() => setIsOpen(false)}
                className="group grid grid-cols-[3.6rem_1fr] items-center gap-2 bg-bone p-2 transition hover:bg-tell-soft"
              >
                <img src={category.image} alt="" className="h-12 w-full object-cover" />
                <span className="block truncate font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink/70 group-hover:text-tell-deep">
                  {category.label}
                </span>
              </Link>
            ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header({ activeSidebar, onCloseSidebars, onOpenCart, onOpenWishlist }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const { auth, cartCount, logout, wishlistItems, path } = useShop();

  const isActive = (href) =>
    href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
  const getSidebarPanel = (href) => {
    if (href === "/cart") return "cart";
    if (href === "/wishlist") return "wishlist";
    return "";
  };
  const openSidebar = (panel) => {
    setIsOpen(false);
    if (panel === "cart") onOpenCart();
    if (panel === "wishlist") onOpenWishlist();
  };
  const getNavLabel = (item) => (
    <>
      {item.label}

      {item.href === "/wishlist" && wishlistItems.length > 0
        ? ` (${wishlistItems.length})`
        : ""}

      {item.href === "/cart" && cartCount > 0
        ? ` (${cartCount})`
        : ""}
    </>
  );
  useEffect(() => {
    if (!isAccountMenuOpen) return undefined;

    const onMouseDown = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsAccountMenuOpen(false);
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isAccountMenuOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-report grid-cols-[auto_auto] items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:grid-cols-[auto_minmax(20rem,34rem)_auto] lg:px-8 lg:py-6">
        <Link
          href="/"
          className="block h-11 w-36 overflow-hidden sm:h-12 sm:w-44"
          aria-label="Tell20 home"
        >
          <img
            src="/logos/primary-logo1.png"
            alt="Tell20"
            className="h-full w-full object-contain"
          />
        </Link>

        <HeaderSearch
          id="header-product-search"
          className="hidden w-full justify-self-center lg:grid"
        />

        <nav
          className="hidden items-center justify-end gap-3 xl:gap-4 lg:flex"
          aria-label="Primary navigation"
        >
          <HeaderCategories />

          {navItems.map((item) => {
            const sidebarPanel = getSidebarPanel(item.href);
            const active = sidebarPanel ? activeSidebar === sidebarPanel || isActive(item.href) : isActive(item.href);
            const className = `rounded-full px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] transition hover:bg-tell-soft hover:text-tell-deep ${
              active ? "bg-tell-soft text-tell-deep" : "text-ink/70"
            }`;

            if (sidebarPanel) {
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => openSidebar(sidebarPanel)}
                  className={className}
                  aria-expanded={activeSidebar === sidebarPanel}
                >
                  {getNavLabel(item)}
                </button>
              );
            }

            return (
              <Link key={item.href} href={item.href} className={className}>
                {getNavLabel(item)}
              </Link>
            );
          })}

          {auth.isAuthenticated ? (
            <div ref={accountMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsAccountMenuOpen((value) => !value)}
                className="grid h-11 w-11 place-items-center rounded-full bg-ink text-bone transition hover:bg-tell-deep"
                aria-label="Open account menu"
                aria-expanded={isAccountMenuOpen}
              >
                <span className="sr-only">Account</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {isAccountMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+0.75rem)] z-[85] w-64 border border-ink/12 bg-paper p-2 shadow-panel">
                  <div className="border-b border-ink/10 px-3 py-3">
                    <p className="truncate font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                      {auth.email}
                    </p>
                  </div>
                  <div className="grid gap-1 py-2">
                    {accountMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="px-3 py-3 font-mono text-xs uppercase tracking-[0.14em] text-ink/75 transition hover:bg-tell-soft hover:text-tell-deep"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        setIsLogoutConfirmOpen(true);
                      }}
                      className="px-3 py-3 text-left font-mono text-xs uppercase tracking-[0.14em] text-ink/75 transition hover:bg-tell-soft hover:text-tell-deep"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-bone transition hover:bg-tell-deep"
            >
              Sign in
            </Link>
          )}
        </nav>

        <button
          type="button"
          onClick={() => {
            onCloseSidebars();
            setIsOpen((value) => !value);
          }}
          className="inline-flex rounded-full border border-ink/15 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-ink lg:hidden"
          aria-expanded={isOpen}
        >
          Menu
        </button>
      </div>

      <div className="mx-auto max-w-report px-4 pb-5 sm:px-6 lg:hidden">
        <HeaderSearch id="mobile-product-search" />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[95] lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile menu">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="sidebar-backdrop absolute inset-0 cursor-default bg-ink/35"
            aria-label="Close mobile menu"
          />

          <aside className="sidebar-slide-right absolute right-0 top-0 flex h-dvh max-h-dvh w-full max-w-[28rem] flex-col overflow-hidden border-l border-ink/12 bg-paper shadow-panel">
            <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Tell20 menu</p>
                <h2 className="mt-2 text-5xl font-black leading-none tracking-[-0.07em]">Menu.</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-ink/15 px-4 py-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] transition hover:border-tell hover:text-tell-deep"
              >
                Close
              </button>
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5" aria-label="Mobile navigation">
              <div className="grid gap-3">
                <div className="border border-ink/10 bg-bone">
                  <button
                    type="button"
                    onClick={() => setIsMobileCategoriesOpen((value) => !value)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink"
                    aria-expanded={isMobileCategoriesOpen}
                  >
                    Categories
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className={`h-4 w-4 transition ${isMobileCategoriesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 7.5 5 5 5-5" />
                    </svg>
                  </button>

                  {isMobileCategoriesOpen && (
                    <div className="grid max-h-96 grid-cols-2 gap-px overflow-y-auto border-t border-ink/10 bg-ink/12">
                      {shopCategories.map((category) => (
                        <Link
                          key={category.label}
                          href={`/shop?category=${encodeURIComponent(category.label)}`}
                          onClick={() => setIsOpen(false)}
                          className="bg-paper p-2"
                        >
                          <img src={category.image} alt="" className="h-16 w-full object-cover" />
                          <span className="mt-2 block truncate font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink/70">
                            {category.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {navItems.map((item) => {
                  const sidebarPanel = getSidebarPanel(item.href);
                  const active = sidebarPanel ? activeSidebar === sidebarPanel || isActive(item.href) : isActive(item.href);
                  const className = `border border-ink/10 px-5 py-4 text-left font-mono text-xs uppercase tracking-[0.14em] ${
                    active ? "bg-tell-soft text-tell-deep" : "bg-bone text-ink/75"
                  }`;

                  if (sidebarPanel) {
                    return (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => openSidebar(sidebarPanel)}
                        className={className}
                        aria-expanded={activeSidebar === sidebarPanel}
                      >
                        {getNavLabel(item)}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={className}
                    >
                      {getNavLabel(item)}
                    </Link>
                  );
                })}

                {auth.isAuthenticated ? (
                  <>
                    {accountMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="border border-ink/10 bg-bone px-5 py-4 text-left font-mono text-xs uppercase tracking-[0.14em] text-ink/75"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setIsLogoutConfirmOpen(true);
                      }}
                      className="border border-ink/10 bg-ink px-5 py-4 text-left font-mono text-xs uppercase tracking-[0.14em] text-bone"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="border border-ink/10 bg-ink px-5 py-4 text-left font-mono text-xs uppercase tracking-[0.14em] text-bone"
                  >
                    Sign in
                  </Link>
                )}
              </div>
            </nav>
          </aside>
        </div>
      )}
      <LogoutConfirmModal
        isOpen={isLogoutConfirmOpen}
        onCancel={() => setIsLogoutConfirmOpen(false)}
        onConfirm={() => {
          setIsLogoutConfirmOpen(false);
          logout();
        }}
      />
    </header>
  );
}
