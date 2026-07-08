import PhoneField from "../forms/PhoneField";

const inputClass =
  "h-12 border border-ink/15 bg-paper px-3 text-sm outline-none transition focus:border-tell";

const textareaClass =
  "resize-none border border-ink/15 bg-paper px-3 py-3 text-sm outline-none transition focus:border-tell";

const selectClass =
  "h-12 border border-ink/15 bg-paper px-3 font-mono text-xs uppercase tracking-[0.12em] outline-none transition focus:border-tell";

const stepStyles = {
  dark: {
    section: "bg-ink text-bone border-bone/10",
    eyebrow: "text-bone/50",
    title: "text-bone",
    note: "text-bone/65",
    body: "bg-bone text-ink"
  },
  sage: {
    section: "bg-[#DCE8DD] text-ink border-black/5",
    eyebrow: "text-ink/50",
    title: "text-ink",
    note: "text-ink/65",
    body: "bg-bone text-ink"
  },
  tell: {
    section: "bg-tell text-bone border-tell-deep/10",
    eyebrow: "text-bone/60",
    title: "text-bone",
    note: "text-bone/75",
    body: "bg-bone text-ink"
  }
};

function TextField({
  autoComplete,
  label,
  name,
  onChange,
  required = true,
  type = "text",
  value
}) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {label}
        {required ? " *" : ""}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        autoComplete={autoComplete}
        required={required}
        className={inputClass}
      />
    </label>
  );
}

function CheckoutStep({ children, eyebrow, note, title, tone = "dark" }) {
  const style = stepStyles[tone] || stepStyles.dark;

  return (
    <section className="overflow-hidden border border-ink/10 bg-paper">
      <div className={`border-b p-4 sm:p-5 ${style.section}`}>
        <div className="grid gap-3 sm:grid-cols-[0.25fr_1fr] sm:items-end">
          <p
            className={`font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] ${style.eyebrow}`}
          >
            {eyebrow}
          </p>

          <div>
            <h2
              className={`text-2xl font-black leading-[0.95] tracking-[-0.05em] sm:text-3xl ${style.title}`}
            >
              {title}
            </h2>

            {note && (
              <p className={`mt-2 max-w-xl text-xs leading-5 ${style.note}`}>
                {note}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={`p-4 sm:p-5 ${style.body}`}>{children}</div>
    </section>
  );
}

export default function CheckoutForm({ details, onChange, onSubmit }) {
  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      <CheckoutStep
        eyebrow="Step 01"
        title="Contact details"
        tone="dark"
        note="Used for receipt, delivery updates, support, and OTP-protected order communication."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField
            autoComplete="name"
            label="Full name"
            name="name"
            value={details.name}
            onChange={onChange}
          />

          <TextField
            autoComplete="email"
            label="Email"
            name="email"
            type="email"
            value={details.email}
            onChange={onChange}
          />

          <div className="sm:col-span-2">
            <PhoneField
              value={details.phone}
              onChange={(value) => onChange("phone", value)}
              required
            />
          </div>
        </div>
      </CheckoutStep>

      <CheckoutStep
        eyebrow="Step 02"
        title="Delivery address"
        tone="sage"
        note="Tell20 uses this information to prepare the package and guide delivery clearly."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <TextField
              autoComplete="address-line1"
              label="Address line 1"
              name="address"
              value={details.address}
              onChange={onChange}
            />
          </div>

          <div className="sm:col-span-2">
            <TextField
              autoComplete="address-line2"
              label="Apartment, suite, landmark"
              name="addressLine2"
              value={details.addressLine2}
              onChange={onChange}
              required={false}
            />
          </div>

          <TextField
            autoComplete="address-level2"
            label="City"
            name="city"
            value={details.city}
            onChange={onChange}
          />

          <TextField
            autoComplete="address-level1"
            label="County / region"
            name="county"
            value={details.county}
            onChange={onChange}
          />

          <TextField
            autoComplete="country-name"
            label="Country"
            name="country"
            value={details.country}
            onChange={onChange}
          />

          <TextField
            autoComplete="postal-code"
            label="Postal code"
            name="postalCode"
            value={details.postalCode}
            onChange={onChange}
            required={false}
          />
        </div>

        <label className="mt-3 grid gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Delivery notes
          </span>

          <textarea
            value={details.deliveryNotes}
            onChange={(event) => onChange("deliveryNotes", event.target.value)}
            rows={3}
            className={textareaClass}
            placeholder="Gate code, preferred drop-off time, or courier notes."
          />
        </label>
      </CheckoutStep>

      <CheckoutStep
        eyebrow="Step 03"
        title="Payment and promo"
        tone="tell"
        note="Choose your payment option and apply a valid Tell20 promo code before placing the order."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Payment method *
            </span>

            <select
              value={details.paymentMethod}
              onChange={(event) => onChange("paymentMethod", event.target.value)}
              required
              className={selectClass}
            >
              <option value="mpesa">M-Pesa on delivery</option>
              <option value="card">Card payment</option>
              <option value="cash">Cash on delivery</option>
            </select>
          </label>

          <TextField
            label="Promo code"
            name="promoCode"
            value={details.promoCode}
            onChange={(key, value) => onChange(key, value.toUpperCase())}
            required={false}
          />
        </div>

        <div className="mt-4 grid overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2">
          <div className="bg-paper p-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
              Promo 01
            </p>
            <p className="mt-2 text-xl font-black tracking-[-0.05em]">
              TELL20
            </p>
            <p className="mt-1 text-xs leading-5 text-ink/65">
              Use for 10% off your order.
            </p>
          </div>

          <div className="bg-[#DCE8DD] p-4">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/55">
              Promo 02
            </p>
            <p className="mt-2 text-xl font-black tracking-[-0.05em]">
              WELCOME20
            </p>
            <p className="mt-1 text-xs leading-5 text-ink/65">
              Use for KSh 1,200 off.
            </p>
          </div>
        </div>
      </CheckoutStep>

      <button className="rounded-full bg-tell px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep">
        Place order
      </button>
    </form>
  );
}
