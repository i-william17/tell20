import AnimatedSection from "../AnimatedSection";
import CheckoutForm from "./CheckoutForm";
import CheckoutSummary from "./CheckoutSummary";

export default function CheckoutLayout({
  cartItems,
  details,
  discount,
  onDetailsChange,
  onSubmit,
  promoCode,
  shipping,
  subtotal,
  total
}) {
  return (
    <AnimatedSection className="overflow-hidden bg-paper text-ink">
      <div className="grid min-h-[calc(100vh-4.25rem)] border-b border-ink/10 lg:grid-cols-[0.38fr_1fr]">
        <aside className="flex flex-col justify-between border-b border-ink/10 bg-ink px-4 py-5 text-bone sm:px-6 lg:border-b-0 lg:border-r lg:px-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone/55">
              Tell20 checkout
            </p>

            <h2 className="mt-5 max-w-sm text-3xl font-black leading-[0.95] tracking-[-0.055em] sm:text-4xl">
              Secure checkout for useful pieces.
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-bone/65">
              Confirm your delivery details, review your order, apply a promo
              code, and complete checkout through the protected Tell20 flow.
            </p>
          </div>

          <div className="mt-8 border-t border-bone/10 pt-5">
            <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.16em] text-bone/40">
              Checkout notes
            </p>

            <div className="mt-3 grid gap-2 text-xs leading-5 text-bone/65">
              <p>OTP-protected account access.</p>
              <p>Free delivery above KSh 15,000.</p>
              <p>Promo codes: TELL20 or WELCOME20.</p>
            </div>
          </div>
        </aside>

        <div className="grid lg:grid-rows-[10rem_auto]">
          <div className="hidden border-b border-ink/10 bg-tell lg:block">
            <div className="flex h-full items-end px-8 py-5">
              <p className="max-w-2xl text-2xl font-black leading-[0.95] tracking-[-0.05em] text-bone">
                Review the order, confirm delivery, then check out clearly.
              </p>
            </div>
          </div>

          <div className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-6 lg:grid-cols-[1fr_21rem] lg:items-start">
                <div>
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                    Delivery details
                  </p>

                  <h1 className="mt-3 max-w-5xl text-balance text-4xl font-black leading-[0.9] tracking-[-0.065em] sm:text-5xl lg:text-6xl">
                    Complete{" "}
                    <em className="italic text-tell">checkout</em>.
                  </h1>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
                    Add your delivery information and confirm how Tell20 should
                    prepare your order.
                  </p>

                  <div className="mt-6">
                    <CheckoutForm
                      details={details}
                      onChange={onDetailsChange}
                      onSubmit={onSubmit}
                    />
                  </div>
                </div>

                <aside className="lg:sticky lg:top-28">
                  <div className="mb-3 grid overflow-hidden border border-ink/10 bg-paper sm:grid-cols-3 lg:grid-cols-1">
                    <article className="border border-ink/10 bg-ink p-4 text-bone">
                      <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/50">
                        Items
                      </p>
                      <p className="mt-3 text-3xl font-black leading-none tracking-[-0.06em]">
                        {cartItems.length}
                      </p>
                    </article>

                    <article className="border border-ink/10 bg-[#DCE8DD] p-4 text-ink">
                      <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink/50">
                        Discount
                      </p>
                      <p className="mt-3 text-3xl font-black leading-none tracking-[-0.06em]">
                        {discount > 0 ? "Yes" : "No"}
                      </p>
                    </article>

                    <article className="border border-ink/10 bg-tell p-4 text-bone">
                      <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/60">
                        Promo
                      </p>
                      <p className="mt-3 text-2xl font-black leading-none tracking-[-0.05em]">
                        {promoCode || "None"}
                      </p>
                    </article>
                  </div>

                  <CheckoutSummary
                    cartItems={cartItems}
                    discount={discount}
                    promoCode={promoCode}
                    shipping={shipping}
                    subtotal={subtotal}
                    total={total}
                  />
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
