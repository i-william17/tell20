import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingWhatsapp from "./components/FloatingWhatsapp";
import CookieConsentModal from "./components/cookie/CookieConsentModal";
import CartWishlistSidebar from "./components/sidebars/CartWishlistSidebar";
import { ShopProvider, useShop } from "./context/ShopContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import LoginPage from "./pages/Login";
import OtpPage from "./pages/Otp";
import RegisterPage from "./pages/Register";
import Contact from "./pages/Contact";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";
import Orders from "./pages/account/Orders";
import Profile from "./pages/account/Profile";
import Support from "./pages/Support";

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
};

const getRoute = (pathname, shop) => {
  const path = normalizePath(pathname);

  if (path === "/") {
    return { title: "Tell20 | Online Store", page: <Home /> };
  }

  if (path === "/about") {
    return { title: "About Tell20", page: <About /> };
  }

  if (path === "/contact") {
    return { title: "Contact Tell20", page: <Contact /> };
  }

  if (path === "/support") {
    return { title: "Support | Tell20", page: <Support /> };
  }

  if (path === "/terms") {
    return { title: "Terms of Service | Tell20", page: <LegalPage type="terms" /> };
  }

  if (path === "/privacy") {
    return { title: "Privacy Policy | Tell20", page: <LegalPage type="privacy" /> };
  }

  if (path === "/shop") {
    return { title: "Shop | Tell20", page: <Shop /> };
  }

  if (path.startsWith("/products/")) {
    const productId = decodeURIComponent(path.split("/").pop());
    const product = shop.products.find((item) => item.id === productId);
    return product
      ? { title: `${product.name} | Tell20`, page: <ProductDetail product={product} /> }
      : { title: "Product not found | Tell20", page: <NotFound /> };
  }

  if (path === "/wishlist") {
    return { title: "Wishlist | Tell20", page: <Home /> };
  }

  if (path === "/cart") {
    return { title: "Cart | Tell20", page: <Home /> };
  }

  if (path === "/checkout") {
    return shop.auth.isAuthenticated
      ? { title: "Checkout | Tell20", page: <Checkout /> }
      : {
          title: "Sign in to checkout | Tell20",
          page: <LoginPage redirectTo="/checkout" message="Checkout is protected. Sign in and verify your account with a one-time code to continue." />
        };
  }

  if (path === "/account") {
    return shop.auth.isAuthenticated
      ? { title: "Account | Tell20", page: <Account /> }
      : {
          title: "Sign in | Tell20",
          page: <LoginPage redirectTo="/account" message="Sign in to see your account, cart, and saved pieces." />
        };
  }

  if (path === "/account/profile") {
    return shop.auth.isAuthenticated
      ? { title: "Profile | Tell20", page: <Profile /> }
      : {
          title: "Sign in | Tell20",
          page: <LoginPage redirectTo="/account/profile" message="Sign in to manage your profile." />
        };
  }

  if (path === "/account/orders") {
    return shop.auth.isAuthenticated
      ? { title: "Orders | Tell20", page: <Orders /> }
      : {
          title: "Sign in | Tell20",
          page: <LoginPage redirectTo="/account/orders" message="Sign in to view your orders." />
        };
  }

  if (path === "/login" || path === "/auth/login" || path === "/auth/sign-in") {
    return { title: "Login | Tell20", page: <LoginPage /> };
  }

  if (path === "/register" || path === "/auth/register") {
    return { title: "Register | Tell20", page: <RegisterPage /> };
  }

  if (path === "/verify-otp" || path === "/auth/verify") {
    return { title: "Verify OTP | Tell20", page: <OtpPage /> };
  }

  return { title: "Not found | Tell20", page: <NotFound /> };
};

function AppFrame() {
  const shop = useShop();
  const route = getRoute(shop.path, shop);
  const { navigate, path } = shop;
  const [activeSidebar, setActiveSidebar] = useState(null);

  const closeSidebar = useCallback(() => {
    setActiveSidebar(null);

    if (path === "/cart" || path === "/wishlist") {
      navigate("/", { replace: true });
    }
  }, [navigate, path]);
  const openCartSidebar = useCallback(() => {
    setActiveSidebar((current) => (current === "cart" ? null : "cart"));
  }, []);
  const openWishlistSidebar = useCallback(() => {
    setActiveSidebar((current) => (current === "wishlist" ? null : "wishlist"));
  }, []);

  useEffect(() => {
    document.title = route.title;
  }, [route.title]);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [shop.path]);

  useEffect(() => {
    if (shop.path !== "/cart" && shop.path !== "/wishlist") {
      closeSidebar();
    }
  }, [closeSidebar, shop.path]);

  useEffect(() => {
    if (shop.path === "/cart") {
      setActiveSidebar("cart");
    }

    if (shop.path === "/wishlist") {
      setActiveSidebar("wishlist");
    }
  }, [shop.path]);

  useEffect(() => {
    const onOpenSidebar = (event) => {
      if (event.detail === "cart") setActiveSidebar("cart");
      if (event.detail === "wishlist") setActiveSidebar("wishlist");
    };

    window.addEventListener("tell20:open-sidebar", onOpenSidebar);
    return () => window.removeEventListener("tell20:open-sidebar", onOpenSidebar);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header
        activeSidebar={activeSidebar}
        onCloseSidebars={closeSidebar}
        onOpenCart={openCartSidebar}
        onOpenWishlist={openWishlistSidebar}
      />
      <main key={shop.path} className="page-transition">
        {route.page}
      </main>
      <Footer />
      <FloatingWhatsapp />
      <CartWishlistSidebar activePanel={activeSidebar} onClose={closeSidebar} />
      <CookieConsentModal />
      <ToastContainer
        position="top-right"
        autoClose={4200}
        closeOnClick
        pauseOnHover
        newestOnTop
        hideProgressBar
        toastClassName="!rounded-none !border !border-ink/12 !bg-bone !font-sans !text-ink !shadow-panel"
        bodyClassName="!text-sm !leading-6"
      />
    </div>
  );
}

export default function App() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const [search, setSearch] = useState(() => window.location.search);

  useEffect(() => {
    const onPopState = () => {
      setPath(normalizePath(window.location.pathname));
      setSearch(window.location.search);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((to, options = {}) => {
    const url = new URL(to, window.location.origin);
    const nextPath = normalizePath(url.pathname);
    const nextFullPath = `${url.pathname}${url.search}${url.hash}`;

    if (options.replace) {
      window.history.replaceState({}, "", nextFullPath);
    } else if (nextFullPath !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.pushState({}, "", nextFullPath);
    }

    setPath(nextPath);
    setSearch(url.search);

    if (url.hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  return (
    <ShopProvider navigate={navigate} path={path} search={search}>
      <AppFrame />
    </ShopProvider>
  );
}
