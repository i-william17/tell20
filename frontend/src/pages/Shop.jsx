import { useEffect, useMemo, useState } from "react";
import ShopFilters from "../components/shop/ShopFilters";
import ShopHero from "../components/shop/ShopHero";
import ShopResultsSection from "../components/shop/ShopResultsSection";
import { useShop } from "../context/ShopContext";
import { categoryLabels, productMatchesCategory } from "../data/shopCategories";

const defaultFilters = {
  category: "All",
  size: "All",
  color: "All",
  material: "All",
  minPrice: "",
  maxPrice: "",
  minRating: "0",
  availability: "all",
  saleOnly: false
};

const unique = (items) => Array.from(new Set(items.filter(Boolean))).sort((a, b) => a.localeCompare(b));

export default function Shop() {
  const { navigate, products, search } = useShop();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState("featured");

  const searchQuery = useMemo(() => new URLSearchParams(search).get("search") || "", [search]);
  const categoryQuery = useMemo(() => new URLSearchParams(search).get("category") || "", [search]);
  const options = useMemo(
    () => ({
      categories: ["All", ...categoryLabels],
      sizes: ["All", ...unique(products.flatMap((product) => product.sizes))],
      colors: ["All", ...unique(products.map((product) => product.color))],
      materials: ["All", ...unique(products.map((product) => product.materialType))]
    }),
    [products]
  );
  const flashSaleCount = products.filter((product) => product.flashSale).length;
  const priceRange = useMemo(
    () => ({
      min: Math.min(...products.map((product) => product.price)),
      max: Math.max(...products.map((product) => product.compareAtPrice || product.price))
    }),
    [products]
  );
  const priceStep = 100;
  const minPriceValue = filters.minPrice === "" ? priceRange.min : Number(filters.minPrice);
  const maxPriceValue = filters.maxPrice === "" ? priceRange.max : Number(filters.maxPrice);
  const activeSearchTerm = query.trim();

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setFilters((current) => ({
      ...current,
      category: categoryLabels.includes(categoryQuery) ? categoryQuery : "All"
    }));
  }, [categoryQuery]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const minPrice = Number(filters.minPrice) || 0;
    const maxPrice = Number(filters.maxPrice) || Infinity;
    const minRating = Number(filters.minRating) || 0;

    return products
      .filter((product) => {
        const searchable = [
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

        const matchesQuery = normalized ? searchable.includes(normalized) : true;
        const matchesCategory = productMatchesCategory(product, filters.category);
        const matchesSize = filters.size === "All" || product.sizes.includes(filters.size);
        const matchesColor = filters.color === "All" || product.color === filters.color;
        const matchesMaterial = filters.material === "All" || product.materialType === filters.material;
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        const matchesRating = product.rating >= minRating;
        const matchesSale = filters.saleOnly ? product.flashSale : true;
        const matchesAvailability =
          filters.availability === "all" ||
          (filters.availability === "in-stock" && product.stock > 0) ||
          (filters.availability === "low-stock" && product.stock > 0 && product.stock <= 10);

        return (
          matchesQuery &&
          matchesCategory &&
          matchesSize &&
          matchesColor &&
          matchesMaterial &&
          matchesPrice &&
          matchesRating &&
          matchesSale &&
          matchesAvailability
        );
      })
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating || b.reviewCount - a.reviewCount;
        if (sort === "popular") return b.reviewCount - a.reviewCount;
        if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        if (sort === "sale") {
          const aDiscount = (a.compareAtPrice || a.price) - a.price;
          const bDiscount = (b.compareAtPrice || b.price) - b.price;
          return bDiscount - aDiscount;
        }
        if (sort === "name") return a.name.localeCompare(b.name);
        return products.findIndex((item) => item.id === a.id) - products.findIndex((item) => item.id === b.id);
      });
  }, [filters, products, query, sort]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const updateMinPrice = (value) => {
    const next = Math.min(Number(value), maxPriceValue);
    updateFilter("minPrice", String(next));
  };

  const updateMaxPrice = (value) => {
    const next = Math.max(Number(value), minPriceValue);
    updateFilter("maxPrice", String(next));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setQuery("");
    setSort("featured");
    if (search) {
      navigate("/shop", { replace: true });
    }
  };

  return (
    <>
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-report">
          <ShopHero activeSearchTerm={activeSearchTerm} resultCount={filtered.length} />
          <ShopFilters
            clearFilters={clearFilters}
            filters={filters}
            filtersOpen={filtersOpen}
            flashSaleCount={flashSaleCount}
            maxPriceValue={maxPriceValue}
            minPriceValue={minPriceValue}
            options={options}
            priceRange={priceRange}
            priceStep={priceStep}
            productCount={products.length}
            query={query}
            resultCount={filtered.length}
            setFiltersOpen={setFiltersOpen}
            setQuery={setQuery}
            setSort={setSort}
            sort={sort}
            updateFilter={updateFilter}
            updateMaxPrice={updateMaxPrice}
            updateMinPrice={updateMinPrice}
          />
        </div>
      </section>

      <ShopResultsSection clearFilters={clearFilters} products={filtered} />
    </>
  );
}
