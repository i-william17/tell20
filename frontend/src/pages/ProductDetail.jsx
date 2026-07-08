import { useMemo, useState } from "react";
import ProductPurchaseSection from "../components/product/ProductPurchaseSection";
import ProductReviews from "../components/product/ProductReviews";
import RelatedProducts from "../components/product/RelatedProducts";
import { useShop } from "../context/ShopContext";

export default function ProductDetail({ product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const { addToCart, toggleWishlist, wishlist, products } = useShop();
  const related = useMemo(
    () => products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3),
    [product, products]
  );
  const wished = wishlist.includes(product.id);
  const reviews = useMemo(() => [...product.reviews, ...submittedReviews], [product.reviews, submittedReviews]);

  return (
    <>
      <ProductPurchaseSection
        addToCart={addToCart}
        isWished={wished}
        product={product}
        selectedSize={size}
        setSelectedSize={setSize}
        toggleWishlist={toggleWishlist}
      />
      <ProductReviews reviews={reviews} onAddReview={(review) => setSubmittedReviews((current) => [review, ...current])} />
      <RelatedProducts category={product.category} products={related} />
    </>
  );
}
