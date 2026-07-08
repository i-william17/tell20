import AnimatedSection from "../components/AnimatedSection";
import CartContent from "../components/cart/CartContent";
import CartEmptyState from "../components/cart/CartEmptyState";
import { useShop } from "../context/ShopContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, subtotal, shipping, total, auth } = useShop();

  return (
    <AnimatedSection className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-report">
        <h1 className="max-w-5xl text-balance text-6xl font-black leading-[0.86] tracking-[-0.075em] sm:text-8xl">
          Cart.
        </h1>

        {cartItems.length === 0 ? (
          <CartEmptyState />
        ) : (
          <CartContent
            auth={auth}
            items={cartItems}
            removeFromCart={removeFromCart}
            shipping={shipping}
            subtotal={subtotal}
            total={total}
            updateQuantity={updateQuantity}
          />
        )}
      </div>
    </AnimatedSection>
  );
}
