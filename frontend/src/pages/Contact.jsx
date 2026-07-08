import { useState } from "react";
import { toast } from "react-toastify";
import AnimatedSection from "../components/AnimatedSection";
import PhoneField from "../components/forms/PhoneField";

const initialContactForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  reason: "General inquiry",
  preferredContact: "email",
  subject: "",
  message: "",
  consent: false
};

const reasons = [
  "General inquiry",
  "Product availability",
  "Bulk or corporate order",
  "Partnership",
  "Press",
  "Supplier inquiry",
  "Store feedback",
  "Other"
];

const contactHighlights = [
  {
    label: "Reply window",
    value: "1 day",
    body: "Most messages receive a response within one business day.",
    tone: "dark"
  },
  {
    label: "Orders",
    value: "Bulk",
    body: "Ask about corporate orders, product availability, and quantities.",
    tone: "sage"
  },
  {
    label: "Brand",
    value: "T20",
    body: "Reach us for partnerships, press, suppliers, and store feedback.",
    tone: "tell"
  }
];

const tones = {
  dark: {
    card: "bg-ink text-bone",
    label: "text-bone/50",
    value: "text-bone",
    body: "text-bone/68"
  },
  sage: {
    card: "bg-[#DCE8DD] text-ink",
    label: "text-ink/50",
    value: "text-ink",
    body: "text-ink/68"
  },
  tell: {
    card: "bg-tell text-bone",
    label: "text-bone/60",
    value: "text-bone",
    body: "text-bone/75"
  }
};

const inputClass =
  "h-14 border border-ink/15 bg-paper px-4 text-lg outline-none transition focus:border-tell";

const selectClass =
  "h-14 border border-ink/15 bg-paper px-4 font-mono text-xs uppercase tracking-[0.12em] outline-none transition focus:border-tell";

export default function Contact() {
  const [form, setForm] = useState(initialContactForm);

  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  };

  return (
    <AnimatedSection className="overflow-hidden bg-paper text-ink">
      <div className="grid min-h-[calc(100vh-4.25rem)] border-b border-ink/10 lg:grid-cols-[0.38fr_1fr]">
        <aside className="flex flex-col justify-between border-b border-ink/10 bg-ink px-4 py-6 text-bone sm:px-6 lg:border-b-0 lg:border-r lg:px-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone/55">
              Contact Tell20
            </p>

            <h2 className="mt-6 max-w-sm text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-6xl">
              Talk to us about products, stock, and partnerships.
            </h2>

            <p className="mt-6 max-w-xs text-base leading-7 text-bone/65">
              Send product questions, stock requests, supplier inquiries, media
              messages, store feedback, and partnership details.
            </p>
          </div>

          <div className="mt-12 border-t border-bone/10 pt-6">
            <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.16em] text-bone/40">
              Tell20 contact
            </p>

            <p className="mt-3 max-w-xs text-sm leading-6 text-bone/65">
              support@tell20.store
            </p>
          </div>
        </aside>

        <div className="grid lg:grid-rows-[16rem_auto]">
          <div className="hidden border-b border-ink/10 bg-tell lg:block">
            <div className="flex h-full items-end px-8 py-7">
              <p className="max-w-xl text-4xl font-black leading-[0.9] tracking-[-0.06em] text-bone">
                Clear messages. Direct replies. Useful next steps.
              </p>
            </div>
          </div>

          <div className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                General contact
              </p>

              <h1 className="mt-4 max-w-5xl text-balance text-6xl font-black leading-[0.86] tracking-[-0.075em] sm:text-8xl">
                Contact <em className="italic text-tell">Tell20</em>.
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-8 text-ink/70">
                Share the product, quantity, timeline, context, or decision you
                need from Tell20.
              </p>

              <div className="mt-10 grid overflow-hidden border border-ink/10 bg-paper md:grid-cols-3">
                {contactHighlights.map((item) => {
                  const tone = tones[item.tone];

                  return (
                    <article
                      key={item.label}
                      className={`min-h-[15rem] border p-6 ${tone.card}`}
                    >
                      <p
                        className={`font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] ${tone.label}`}
                      >
                        {item.label}
                      </p>

                      <p
                        className={`mt-8 text-6xl font-black leading-none tracking-[-0.07em] ${tone.value}`}
                      >
                        {item.value}
                      </p>

                      <p className={`mt-5 text-sm leading-6 ${tone.body}`}>
                        {item.body}
                      </p>
                    </article>
                  );
                })}
              </div>

              <form
                className="mt-10 grid gap-5 border border-ink/12 bg-bone p-5 shadow-panel sm:grid-cols-2 sm:p-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  toast.success(
                    "Message received. We will reply from support@tell20.store."
                  );
                  setForm(initialContactForm);
                }}
              >
                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Full name *
                  </span>

                  <input
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    required
                    className={inputClass}
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Company / organization
                  </span>

                  <input
                    value={form.company}
                    onChange={(event) =>
                      updateField("company", event.target.value)
                    }
                    className={inputClass}
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Email *
                  </span>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    required
                    className={inputClass}
                  />
                </label>

                <PhoneField
                  value={form.phone}
                  onChange={(value) => updateField("phone", value)}
                  label="Phone"
                  required
                />

                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Reason *
                  </span>

                  <select
                    value={form.reason}
                    onChange={(event) =>
                      updateField("reason", event.target.value)
                    }
                    required
                    className={selectClass}
                  >
                    {reasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Preferred contact *
                  </span>

                  <select
                    value={form.preferredContact}
                    onChange={(event) =>
                      updateField("preferredContact", event.target.value)
                    }
                    required
                    className={selectClass}
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone call</option>
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </label>

                <label className="grid gap-2 sm:col-span-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Subject *
                  </span>

                  <input
                    value={form.subject}
                    onChange={(event) =>
                      updateField("subject", event.target.value)
                    }
                    required
                    className={inputClass}
                  />
                </label>

                <label className="grid gap-2 sm:col-span-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Message *
                  </span>

                  <textarea
                    value={form.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    required
                    rows={6}
                    className="resize-none border border-ink/15 bg-paper px-4 py-3 text-lg outline-none transition focus:border-tell"
                    placeholder="Share the product, quantity, timeline, context, or decision you need from Tell20."
                  />
                </label>

                <label className="flex gap-3 border border-ink/12 bg-paper p-4 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(event) =>
                      updateField("consent", event.target.checked)
                    }
                    required
                    className="mt-1 h-4 w-4 accent-[#078B88]"
                  />

                  <span className="text-sm leading-6 text-ink/70">
                    I agree that Tell20 may use these details to respond to this
                    message.
                  </span>
                </label>

                <button className="rounded-full bg-tell px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep sm:col-span-2">
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}