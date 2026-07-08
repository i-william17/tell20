import CartItems from "./CartItems";
import CartSummary from "./CartSummary";

export default function CartContent({ auth, items, removeFromCart, shipping, subtotal, total, updateQuantity }) {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_24rem]">
      <CartItems items={items} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      <CartSummary auth={auth} shipping={shipping} subtotal={subtotal} total={total} />
    </div>
  );
}
