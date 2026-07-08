import AnimatedSection from "../../components/AnimatedSection";
import Link from "../../components/Link";
import { useShop } from "../../context/ShopContext";

export default function Profile() {
  const { currentCustomer } = useShop();

  return (
    <AnimatedSection className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-report">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_1fr]">
          <aside className="border border-ink/12 bg-bone p-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Profile</p>
            <p className="mt-5 text-lg leading-7 text-ink/70">
              Your Tell20 account keeps checkout, wishlist, and support details connected.
            </p>
          </aside>

          <div>
            <h1 className="max-w-5xl text-balance text-6xl font-black leading-[0.86] tracking-[-0.075em] sm:text-8xl">
              Your profile.
            </h1>

            <div className="mt-10 grid gap-px overflow-hidden border border-ink/12 bg-ink/12 sm:grid-cols-2">
              {[
                ["Name", `${currentCustomer?.firstName || ""} ${currentCustomer?.lastName || ""}`.trim()],
                ["Email", currentCustomer?.email],
                ["Phone", currentCustomer?.phone],
                ["Customer since", currentCustomer?.joinedAt ? new Date(currentCustomer.joinedAt).toLocaleDateString() : "Today"]
              ].map(([label, value]) => (
                <article key={label} className="bg-bone p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
                  <p className="mt-4 text-2xl font-black tracking-[-0.05em]">{value || "Not added"}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/account/orders" className="rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone">
                View orders
              </Link>
              <Link href="/support" className="rounded-full border border-ink/15 px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink">
                Get support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
