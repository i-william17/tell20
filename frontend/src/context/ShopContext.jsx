import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ShopContext = createContext(null);

const PRODUCTS = [
  {
    id: "t20-wr-1001",
    slug: "market-linen-shirt",
    sku: "T20-WR-1001",
    name: "Market Linen Shirt",
    category: "Wear",
    subcategory: "Shirts",
    price: 7200,
    compareAtPrice: 8900,
    color: "Bone",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=85",
    material: "Washed linen, corozo buttons",
    materialType: "Linen",
    fit: "Relaxed, true to size",
    stock: 18,
    rating: 4.8,
    reviewCount: 126,
    vendor: "Nairobi Supply Studio",
    origin: "Made in Kenya",
    deliveryWindow: "1-3 days Nairobi, 3-5 days countrywide",
    warranty: "30 day stitch guarantee",
    returnWindow: "14 days",
    featuredRank: 1,
    createdAt: "2026-06-21",
    flashSale: true,
    saleEnds: "2026-07-12T23:59:00+03:00",
    tags: ["linen", "warm weather", "workwear", "sale"],
    description:
      "A relaxed linen shirt cut for warm days, long walks, and easy layering. Soft structure, clean seams, and a quiet finish.",
    reviews: [
      {
        author: "Achieng O.",
        rating: 5,
        title: "Light without feeling fragile",
        body: "The fabric is breathable for Nairobi afternoons and still sharp enough for office days.",
        date: "2026-06-28"
      },
      {
        author: "Brian K.",
        rating: 4.6,
        title: "Easy repeat wear",
        body: "Sizing was accurate and the collar sits clean after washing.",
        date: "2026-07-02"
      }
    ]
  },
  {
    id: "t20-bg-1002",
    slug: "daily-canvas-tote",
    sku: "T20-BG-1002",
    name: "Daily Canvas Tote",
    category: "Carry",
    subcategory: "Totes",
    price: 4800,
    compareAtPrice: 6200,
    color: "Tell teal",
    sizes: ["One size"],
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1400&q=85",
    material: "18oz cotton canvas",
    materialType: "Canvas",
    fit: "Fits a 15 inch laptop",
    stock: 24,
    rating: 4.7,
    reviewCount: 88,
    vendor: "Tell20 Carry Lab",
    origin: "Made in Kenya",
    deliveryWindow: "Same day dispatch before 11 AM in Nairobi",
    warranty: "6 month handle repair",
    returnWindow: "14 days",
    featuredRank: 2,
    createdAt: "2026-06-14",
    flashSale: true,
    saleEnds: "2026-07-12T23:59:00+03:00",
    tags: ["canvas", "laptop", "market", "sale"],
    description:
      "A structured canvas tote with enough room for market runs, a laptop, and the small things that should not get lost.",
    reviews: [
      {
        author: "Muthoni W.",
        rating: 5,
        title: "Carries a full work day",
        body: "Laptop, bottle, charger, and groceries fit without the bag collapsing.",
        date: "2026-06-19"
      }
    ]
  },
  {
    id: "t20-ow-1003",
    slug: "twenty-field-jacket",
    sku: "T20-OW-1003",
    name: "Twenty Field Jacket",
    category: "Outerwear",
    subcategory: "Jackets",
    price: 12800,
    color: "Black",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1400&q=85",
    material: "Cotton twill shell, recycled lining",
    materialType: "Cotton twill",
    fit: "Boxy, size down for a closer fit",
    stock: 9,
    rating: 4.9,
    reviewCount: 64,
    vendor: "Kilimani Utility Works",
    origin: "Cut and sewn in Kenya",
    deliveryWindow: "2-4 working days",
    warranty: "90 day seam and zip cover",
    returnWindow: "14 days",
    featuredRank: 3,
    createdAt: "2026-05-30",
    flashSale: false,
    tags: ["outerwear", "twill", "pockets", "travel"],
    description:
      "A light jacket with a boxy fit, deep utility pockets, and a crisp line that works over almost everything.",
    reviews: [
      {
        author: "Irene M.",
        rating: 5,
        title: "Useful pockets, good weight",
        body: "The jacket feels structured without being hot. The pockets are actually practical.",
        date: "2026-06-11"
      }
    ]
  },
  {
    id: "t20-wr-1004",
    slug: "soft-rib-tank",
    sku: "T20-WR-1004",
    name: "Soft Rib Tank",
    category: "Wear",
    subcategory: "Basics",
    price: 3600,
    color: "Ivory",
    sizes: ["XS", "S", "M", "L"],
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1400&q=85",
    material: "Ribbed organic cotton",
    materialType: "Organic cotton",
    fit: "Close fit with stretch",
    stock: 31,
    rating: 4.6,
    reviewCount: 143,
    vendor: "Tell20 Essentials",
    origin: "Made in Kenya",
    deliveryWindow: "1-3 days Nairobi, 3-5 days countrywide",
    warranty: "30 day quality cover",
    returnWindow: "14 days",
    featuredRank: 4,
    createdAt: "2026-06-03",
    flashSale: false,
    tags: ["cotton", "base layer", "everyday"],
    description:
      "A simple ribbed base layer with a close fit and heavy binding. Made for repeat wear, not special occasions.",
    reviews: [
      {
        author: "June N.",
        rating: 4.6,
        title: "Good neckline and weight",
        body: "The fabric is not see-through and the binding has held up after weekly washes.",
        date: "2026-06-25"
      }
    ]
  },
  {
    id: "t20-fw-1005",
    slug: "runner-low",
    sku: "T20-FW-1005",
    name: "Runner Low",
    category: "Footwear",
    subcategory: "Sneakers",
    price: 9600,
    compareAtPrice: 12200,
    color: "White",
    sizes: ["7", "8", "9", "10", "11", "12"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85",
    material: "Mesh upper, rubber outsole",
    materialType: "Mesh",
    fit: "True to size",
    stock: 14,
    rating: 4.7,
    reviewCount: 97,
    vendor: "Tell20 Footwear",
    origin: "Designed in Nairobi",
    deliveryWindow: "2-4 working days",
    warranty: "60 day sole cover",
    returnWindow: "14 days if unworn",
    featuredRank: 5,
    createdAt: "2026-06-10",
    flashSale: true,
    saleEnds: "2026-07-11T23:59:00+03:00",
    tags: ["sneaker", "walking", "sale", "lightweight"],
    description:
      "A light everyday sneaker with a low profile, cushioned footbed, and enough color to keep the outfit awake.",
    reviews: [
      {
        author: "Kevin L.",
        rating: 4.8,
        title: "Comfortable straight away",
        body: "No break-in period. I wore them across town the first day.",
        date: "2026-06-30"
      }
    ]
  },
  {
    id: "t20-bg-1006",
    slug: "weekender-pack",
    sku: "T20-BG-1006",
    name: "Weekender Pack",
    category: "Carry",
    subcategory: "Backpacks",
    price: 11800,
    color: "Graphite",
    sizes: ["One size"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=85",
    material: "Recycled nylon, padded back",
    materialType: "Recycled nylon",
    fit: "22 liter capacity",
    stock: 12,
    rating: 4.9,
    reviewCount: 51,
    vendor: "Tell20 Carry Lab",
    origin: "Assembled in Kenya",
    deliveryWindow: "2-4 working days",
    warranty: "1 year hardware cover",
    returnWindow: "14 days",
    featuredRank: 6,
    createdAt: "2026-05-22",
    flashSale: false,
    tags: ["travel", "laptop", "recycled nylon"],
    description:
      "A compact travel pack with a squared silhouette, padded sleeve, and simple compartments that stay out of the way.",
    reviews: [
      {
        author: "Njeri G.",
        rating: 5,
        title: "Clean travel bag",
        body: "It fits a weekend change and still works for Monday commuting.",
        date: "2026-06-08"
      }
    ]
  },
  {
    id: "t20-wr-1007",
    slug: "studio-trouser",
    sku: "T20-WR-1007",
    name: "Studio Trouser",
    category: "Wear",
    subcategory: "Trousers",
    price: 8800,
    color: "Charcoal",
    sizes: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    material: "Cotton twill with light stretch",
    materialType: "Cotton twill",
    fit: "Straight leg, mid rise",
    stock: 16,
    rating: 4.8,
    reviewCount: 76,
    vendor: "Kilimani Utility Works",
    origin: "Cut and sewn in Kenya",
    deliveryWindow: "1-3 days Nairobi, 3-5 days countrywide",
    warranty: "30 day stitch guarantee",
    returnWindow: "14 days",
    featuredRank: 7,
    createdAt: "2026-06-01",
    flashSale: false,
    tags: ["trouser", "workwear", "cotton"],
    description:
      "A clean trouser with an easy top block, straight leg, and enough polish for dinner after a full day out.",
    reviews: [
      {
        author: "Sam O.",
        rating: 4.7,
        title: "Works with everything",
        body: "The straight leg is balanced and the fabric keeps its shape.",
        date: "2026-06-18"
      }
    ]
  },
  {
    id: "t20-hm-1008",
    slug: "home-knit-throw",
    sku: "T20-HM-1008",
    name: "Home Knit Throw",
    category: "Home",
    subcategory: "Soft goods",
    price: 6400,
    compareAtPrice: 7900,
    color: "Sand",
    sizes: ["One size"],
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85",
    material: "Cotton knit",
    materialType: "Cotton knit",
    fit: "55 x 70 inches",
    stock: 20,
    rating: 4.7,
    reviewCount: 59,
    vendor: "Tell20 Home",
    origin: "Made in Kenya",
    deliveryWindow: "2-4 working days",
    warranty: "30 day quality cover",
    returnWindow: "14 days",
    featuredRank: 8,
    createdAt: "2026-05-18",
    flashSale: true,
    saleEnds: "2026-07-10T23:59:00+03:00",
    tags: ["home", "cotton", "sale", "throw"],
    description:
      "A soft throw for the couch, the end of the bed, or the basket by the door. Weighty, simple, and useful.",
    reviews: [
      {
        author: "Lydia A.",
        rating: 4.7,
        title: "Good weight",
        body: "Warm enough for evenings without looking bulky on the sofa.",
        date: "2026-06-16"
      }
    ]
  },
  {
    id: "t20-ac-1009",
    slug: "rib-crew-socks",
    sku: "T20-AC-1009",
    name: "Rib Crew Socks",
    category: "Accessories",
    subcategory: "Socks",
    price: 1800,
    color: "Oat",
    sizes: ["S/M", "L/XL"],
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=1400&q=85",
    material: "Combed cotton blend",
    materialType: "Cotton blend",
    fit: "Cushioned rib crew",
    stock: 42,
    rating: 4.5,
    reviewCount: 112,
    vendor: "Tell20 Essentials",
    origin: "Made in Kenya",
    deliveryWindow: "1-3 days Nairobi, 3-5 days countrywide",
    warranty: "30 day quality cover",
    returnWindow: "Final sale once opened",
    featuredRank: 9,
    createdAt: "2026-06-26",
    flashSale: false,
    tags: ["socks", "cotton", "essentials"],
    description:
      "A cushioned rib sock with a clean cuff, soft hand feel, and enough recovery to stay up through long days.",
    reviews: [
      {
        author: "Peter M.",
        rating: 4.5,
        title: "Thick but breathable",
        body: "They feel premium without making sneakers tight.",
        date: "2026-07-01"
      }
    ]
  },
  {
    id: "t20-hm-1010",
    slug: "counter-glass-set",
    sku: "T20-HM-1010",
    name: "Counter Glass Set",
    category: "Home",
    subcategory: "Tableware",
    price: 5400,
    color: "Clear",
    sizes: ["Set of 4"],
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1400&q=85",
    material: "Pressed soda-lime glass",
    materialType: "Glass",
    fit: "320ml capacity",
    stock: 11,
    rating: 4.6,
    reviewCount: 34,
    vendor: "Tell20 Home",
    origin: "Sourced from regional makers",
    deliveryWindow: "2-4 working days",
    warranty: "Breakage cover on arrival",
    returnWindow: "14 days if unused",
    featuredRank: 10,
    createdAt: "2026-06-17",
    flashSale: false,
    tags: ["home", "glass", "tableware"],
    description:
      "A low, stackable glass set for water, juice, and evening drinks. Heavy base, clean rim, and easy storage.",
    reviews: [
      {
        author: "Grace W.",
        rating: 4.6,
        title: "Simple and sturdy",
        body: "They stack neatly and feel heavier than the usual glass set.",
        date: "2026-06-29"
      }
    ]
  }
];

const productGalleryImages = {
  "t20-wr-1001": [
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1400&q=85"
  ],
  "t20-bg-1002": [
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1400&q=85"
  ],
  "t20-ow-1003": [
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=1400&q=85"
  ],
  "t20-wr-1004": [
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1400&q=85"
  ],
  "t20-fw-1005": [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1400&q=85"
  ],
  "t20-bg-1006": [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85"
  ],
  "t20-wr-1007": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1506629905607-d9f297d215c8?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85"
  ],
  "t20-hm-1008": [
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85"
  ],
  "t20-ac-1009": [
    "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1400&q=85"
  ],
  "t20-hm-1010": [
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1523368749929-6b2bf370dbf8?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85"
  ]
};

const PRODUCTS_WITH_GALLERIES = PRODUCTS.map((product) => ({
  ...product,
  images: productGalleryImages[product.id] || [product.image]
}));

const readJson = (key, fallback) => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const defaultAuth = {
  isAuthenticated: false,
  email: "",
  pendingEmail: "",
  pendingOtp: "",
  pendingAction: "",
  redirectTo: "/"
};

const normalizeEmail = (email) => email.trim().toLowerCase();
const getUsername = (email) => normalizeEmail(email).split("@")[0];
const isStrongPassword = (password) =>
  password.length >= 8 &&
  /[a-z]/.test(password) &&
  /[A-Z]/.test(password) &&
  /\d/.test(password) &&
  /[^A-Za-z0-9]/.test(password);

export function ShopProvider({ children, navigate, path, search = "" }) {
  const [cart, setCart] = useState(() => readJson("tell20_cart", []));
  const [wishlist, setWishlist] = useState(() => readJson("tell20_wishlist", []));
  const [customers, setCustomers] = useState(() => readJson("tell20_customers", []));
  const [auth, setAuth] = useState(() => ({ ...defaultAuth, ...readJson("tell20_auth", defaultAuth) }));
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => writeJson("tell20_cart", cart), [cart]);
  useEffect(() => writeJson("tell20_wishlist", wishlist), [wishlist]);
  useEffect(() => writeJson("tell20_customers", customers), [customers]);
  useEffect(() => writeJson("tell20_auth", auth), [auth]);

  const productMap = useMemo(() => new Map(PRODUCTS_WITH_GALLERIES.map((product) => [product.id, product])), []);
  const cartItems = useMemo(
    () =>
      cart
        .map((item) => ({ ...item, product: productMap.get(item.productId) }))
        .filter((item) => item.product),
    [cart, productMap]
  );
  const wishlistItems = useMemo(
    () => wishlist.map((id) => productMap.get(id)).filter(Boolean),
    [wishlist, productMap]
  );

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 15000 || subtotal === 0 ? 0 : 450;
  const total = subtotal + shipping;
  const cartCount = cart.reduce((totalItems, item) => totalItems + item.quantity, 0);
  const currentCustomer = customers.find((customer) => customer.email === auth.email) || null;

  const addToCart = (productId, quantity = 1, size = "One size") => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId && item.size === size);
      if (existing) {
        return current.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...current, { productId, quantity, size }];
    });
  };

  const updateQuantity = (productId, size, quantity) => {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId, size) => {
    setCart((current) => current.filter((item) => item.productId !== productId || item.size !== size));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    setWishlist((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
    );
  };

  const moveWishlistToCart = (productId) => {
    const product = productMap.get(productId);
    if (!product) return;
    addToCart(productId, 1, product.sizes[0]);
    setWishlist((current) => current.filter((id) => id !== productId));
  };

  const registerCustomer = (details, redirectTo = "/") => {
    const fullName = (details.fullName || `${details.firstName || ""} ${details.lastName || ""}`).trim();
    const [firstName = "", ...restName] = fullName.split(/\s+/);
    const lastName = restName.join(" ");
    const email = normalizeEmail(details.email);
    const phone = details.phone.trim();
    const password = details.password;
    const confirmPassword = details.confirmPassword;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return { ok: false, message: "Complete every required field before creating an account." };
    }

    if (!isStrongPassword(password)) {
      return {
        ok: false,
        message: "Use a stronger password: 8+ characters with uppercase, lowercase, number, and symbol."
      };
    }

    if (password !== confirmPassword) {
      return { ok: false, message: "The password confirmation does not match." };
    }

    if (!details.acceptTerms) {
      return { ok: false, message: "Accept the Terms of Service and Privacy Policy to continue." };
    }

    if (customers.some((customer) => customer.email === email)) {
      return { ok: false, message: "An account already exists for that email. Sign in instead." };
    }

    const customer = {
      id: `CUS-${Date.now().toString().slice(-6)}`,
      firstName,
      lastName,
      fullName,
      email,
      username: getUsername(email),
      phone,
      password,
      joinedAt: new Date().toISOString()
    };

    setCustomers((current) => [...current, customer]);
    setAuth({
      ...defaultAuth,
      pendingEmail: email,
      pendingOtp: "2026",
      pendingAction: "register",
      redirectTo
    });
    navigate("/verify-otp");

    return { ok: true, message: "Account created. Enter the OTP sent to your phone or email." };
  };

  const loginCustomer = (details, redirectTo = "/") => {
    const identifier = (details.username || details.email || "").trim().toLowerCase();
    const password = details.password;
    const customer = customers.find((item) => item.email === identifier || item.username === identifier);

    if (!identifier || !password) {
      return { ok: false, message: "Username and password are required." };
    }

    if (!customer) {
      return { ok: false, message: "No Tell20 account uses that email. Create an account first." };
    }

    if (customer.password !== password) {
      return { ok: false, message: "The password is incorrect." };
    }

    setAuth({
      ...defaultAuth,
      pendingEmail: customer.email,
      pendingOtp: "2026",
      pendingAction: "login",
      redirectTo
    });
    navigate("/verify-otp");

    return { ok: true, message: "Details accepted. Enter the OTP code to finish signing in." };
  };

  const requestOtp = (email, redirectTo = "/") => {
    setAuth({
      ...defaultAuth,
      pendingEmail: email,
      pendingOtp: "2026",
      pendingAction: "otp",
      redirectTo
    });
    navigate("/verify-otp");
  };

  const verifyOtp = (code) => {
    if (code.trim() !== auth.pendingOtp) {
      return false;
    }
    const nextAuth = {
      ...defaultAuth,
      isAuthenticated: true,
      email: auth.pendingEmail,
      redirectTo: "/"
    };
    setAuth(nextAuth);
    navigate(auth.redirectTo || "/");
    return true;
  };

  const logout = () => {
    setAuth(defaultAuth);
    navigate("/");
  };

  const placeOrder = (details, pricing = {}) => {
    const orderSubtotal = pricing.subtotal ?? subtotal;
    const orderShipping = pricing.shipping ?? shipping;
    const orderDiscount = pricing.discount ?? 0;
    const orderTotal = pricing.total ?? Math.max(0, subtotal + shipping - orderDiscount);
    const order = {
      id: `T20-${Date.now().toString().slice(-6)}`,
      details,
      items: cartItems,
      subtotal: orderSubtotal,
      shipping: orderShipping,
      discount: orderDiscount,
      promoCode: pricing.promoCode || "",
      total: orderTotal
    };
    setLastOrder(order);
    clearCart();
    return order;
  };

  const value = {
    auth,
    customers,
    currentCustomer,
    products: PRODUCTS_WITH_GALLERIES,
    cart,
    cartCount,
    cartItems,
    clearCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    wishlist,
    wishlistItems,
    toggleWishlist,
    moveWishlistToCart,
    subtotal,
    shipping,
    total,
    lastOrder,
    placeOrder,
    registerCustomer,
    loginCustomer,
    requestOtp,
    verifyOtp,
    logout,
    navigate,
    path,
    search
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }
  return context;
}
