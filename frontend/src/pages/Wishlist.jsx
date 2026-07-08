import AnimatedSection from "../components/AnimatedSection";
import WishlistEmptyState from "../components/wishlist/WishlistEmptyState";
import WishlistGrid from "../components/wishlist/WishlistGrid";
import WishlistHeader from "../components/wishlist/WishlistHeader";
import { useShop } from "../context/ShopContext";

export default function Wishlist() {
  const { wishlistItems, moveWishlistToCart } = useShop();

  return (
    <AnimatedSection className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-report">
        <WishlistHeader />
        {wishlistItems.length === 0 ? <WishlistEmptyState /> : <WishlistGrid products={wishlistItems} onMoveToCart={moveWishlistToCart} />}
      </div>
    </AnimatedSection>
  );
}
