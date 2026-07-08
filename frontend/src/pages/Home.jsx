import HomeClosing from "../components/home/HomeClosing";
import HomeFlashSales from "../components/home/HomeFlashSales";
import HomeHero from "../components/home/HomeHero";
import HomeNewPieces from "../components/home/HomeNewPieces";
import HomeService from "../components/home/HomeService";
import HomeShoppingFlow from "../components/home/HomeShoppingFlow";
import HomeStats from "../components/home/HomeStats";
import HomeValues from "../components/home/HomeValues";
import { useShop } from "../context/ShopContext";

export default function Home() {
  const { products } = useShop();
  const featured = products[0];
  const heroProducts = products.slice(1, 5);
  const flashSaleProducts = products.filter((product) => product.flashSale).slice(0, 4);

  return (
    <>
      <HomeHero featured={featured} />
      <HomeStats />
      <HomeFlashSales products={flashSaleProducts} />
      <HomeNewPieces products={heroProducts} />
      <HomeShoppingFlow featured={featured} />
      <HomeValues />
      <HomeService />
      <HomeClosing />
    </>
  );
}
