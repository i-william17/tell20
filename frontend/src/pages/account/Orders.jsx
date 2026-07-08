import AnimatedSection from "../../components/AnimatedSection";
import Link from "../../components/Link";
import Money from "../../components/Money";
import { useShop } from "../../context/ShopContext";

export default function Orders() {
  const { lastOrder } = useShop();

  return (
    <AnimatedSection className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-report">
        <h1 className="max-w-5xl text-balance text-6xl font-black leading-[0.86] tracking-[-0.075em] sm:text-8xl">
          Orders.
        </h1>

        {lastOrder ? (
          <div className="mt-10 border border-ink/12 bg-bone p-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Order {lastOrder.id}</p>
            <div className="mt-6 grid gap-4">
              {lastOrder.items.map((item) => (
                <article key={`${item.productId}-${item.size}`} className="flex gap-4 border-b border-ink/12 pb-4">
                  <img src={item.product.image} alt={item.product.name} className="h-20 w-20 object-cover" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-black tracking-[-0.05em]">{item.product.name}</h2>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                      {item.quantity} x {item.size}
                    </p>
                  </div>
                  <p className="font-bold"><Money value={item.product.price * item.quantity} /></p>
                </article>
              ))}
            </div>
            <div className="mt-5 flex justify-between text-3xl font-black tracking-[-0.05em]">
              <span>Total</span>
              <span><Money value={lastOrder.total} /></span>
            </div>
          </div>
        ) : (
          <div className="mt-10 border border-ink/12 bg-bone p-8">
            <p className="max-w-xl text-xl leading-8 text-ink/70">
              No completed orders are stored in this local session yet.
            </p>
            <Link href="/shop" className="mt-8 inline-flex rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone">
              Start shopping
            </Link>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}
