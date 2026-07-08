export const shopCategories = [
  {
    label: "Wear",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Shirts",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Basics",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Trousers",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Outerwear",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Carry",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Totes",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Backpacks",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Accessories",
    image: "https://images.unsplash.com/photo-1506629905607-d9f297d215c8?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Socks",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Home",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Tableware",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Soft goods",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Linen",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Canvas",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Travel",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80"
  },
  {
    label: "Flash sale",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80"
  }
];

export const categoryLabels = shopCategories.map((category) => category.label);

export const productMatchesCategory = (product, category) => {
  if (!category || category === "All") return true;

  const normalizedCategory = category.toLowerCase();
  const fields = [
    product.category,
    product.subcategory,
    product.materialType,
    product.material,
    product.color,
    ...(product.tags || [])
  ].map((item) => String(item).toLowerCase());

  if (normalizedCategory === "flash sale") return Boolean(product.flashSale);

  return fields.some((field) => field === normalizedCategory || field.includes(normalizedCategory));
};
