import { useState } from "react";
import { toast } from "react-toastify";
import AnimatedSection from "../components/AnimatedSection";
import PhoneField from "../components/forms/PhoneField";

const maxImageSize = 2 * 1024 * 1024;

const supportTopics = [
  "Order status",
  "Delivery issue",
  "Return or exchange",
  "Refund",
  "Payment issue",
  "Damaged or wrong item",
  "Warranty claim",
  "Account or OTP",
  "Product question",
  "Other"
];

const initialSupportForm = {
  topic: "Order status",
  priority: "normal",
  name: "",
  email: "",
  phone: "",
  orderId: "",
  productName: "",
  subject: "",
  message: "",
  preferredContact: "email",
  images: []
};

const supportHighlights = [
  {
    label: "Reply window",
    value: "1 day",
    body: "Most support messages receive a response within one business day.",
    tone: "dark"
  },
  {
    label: "Returns",
    value: "14d",
    body: "Unworn items can be returned within the Tell20 return window.",
    tone: "sage"
  },
  {
    label: "Evidence",
    value: "2MB",
    body: "Attach product photos, receipts, package labels, or damage evidence.",
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

export default function Support() {
  const [form, setForm] = useState(initialSupportForm);

  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  };

  const handleImages = (event) => {
    const files = Array.from(event.target.files || []);
    const oversized = files.filter((file) => file.size > maxImageSize);
    const validImages = files.filter((file) => file.size <= maxImageSize);

    if (oversized.length > 0) {
      toast.error("Each support image must be 2MB or smaller.");
    }

    updateField("images", validImages);
    event.target.value = "";
  };

  return (
    <AnimatedSection className="overflow-hidden bg-paper text-ink">
      <div className="grid min-h-[calc(100vh-4.25rem)] border-b border-ink/10 lg:grid-cols-[0.38fr_1fr]">
        <aside className="flex flex-col justify-between border-b border-ink/10 bg-ink px-4 py-6 text-bone sm:px-6 lg:border-b-0 lg:border-r lg:px-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone/55">
              Tell20 support
            </p>

            <h2 className="mt-6 max-w-sm text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-6xl">
              Clear help for orders, returns, and checkout.
            </h2>

            <p className="mt-6 max-w-xs text-base leading-7 text-bone/65">
              Send order issues, delivery questions, damaged item reports, OTP
              problems, return requests, and product support details.
            </p>
          </div>

          <div className="mt-12 border-t border-bone/10 pt-6">
            <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.16em] text-bone/40">
              Images accepted
            </p>

            <p className="mt-3 max-w-xs text-sm leading-6 text-bone/65">
              JPG, PNG, and WebP files. Maximum size is 2MB per image.
            </p>
          </div>
        </aside>

        <div className="grid lg:grid-rows-[16rem_auto]">
          <div className="hidden border-b border-ink/10 bg-tell lg:block">
            <div className="flex h-full items-end px-8 py-7">
              <p className="max-w-xl text-4xl font-black leading-[0.9] tracking-[-0.06em] text-bone">
                Support that keeps every order clear.
              </p>
            </div>
          </div>

          <div className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-6xl">
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                Customer support desk
              </p>

              <h1 className="mt-4 max-w-5xl text-balance text-6xl font-black leading-[0.86] tracking-[-0.075em] sm:text-8xl">
                <em className="italic text-tell">Support</em> desk.
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-8 text-ink/70">
                Tell us what happened, attach useful evidence, and Tell20
                support will respond with the next steps.
              </p>

              <div className="mt-10 grid overflow-hidden border border-ink/10 bg-paper md:grid-cols-3">
                {supportHighlights.map((item) => {
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
                    "Support request sent. Tell20 support will respond with next steps."
                  );
                  setForm(initialSupportForm);
                }}
              >
                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Support topic *
                  </span>

                  <select
                    value={form.topic}
                    onChange={(event) =>
                      updateField("topic", event.target.value)
                    }
                    required
                    className={selectClass}
                  >
                    {supportTopics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Priority *
                  </span>

                  <select
                    value={form.priority}
                    onChange={(event) =>
                      updateField("priority", event.target.value)
                    }
                    required
                    className={selectClass}
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="follow-up">Follow-up</option>
                  </select>
                </label>

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

                <div className="sm:col-span-2">
                  <PhoneField
                    value={form.phone}
                    onChange={(value) => updateField("phone", value)}
                    required
                  />
                </div>

                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Order ID
                  </span>

                  <input
                    value={form.orderId}
                    onChange={(event) =>
                      updateField("orderId", event.target.value)
                    }
                    placeholder="T20-123456"
                    className={inputClass}
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Product name
                  </span>

                  <input
                    value={form.productName}
                    onChange={(event) =>
                      updateField("productName", event.target.value)
                    }
                    className={inputClass}
                  />
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

                <label className="grid gap-2">
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
                    Issue details *
                  </span>

                  <textarea
                    value={form.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    required
                    rows={6}
                    className="resize-none border border-ink/15 bg-paper px-4 py-3 text-lg outline-none transition focus:border-tell"
                    placeholder="Include dates, delivery location, product condition, payment reference, and what outcome you need."
                  />
                </label>

                <div className="grid gap-3 border border-ink/12 bg-paper p-4 sm:col-span-2">
                  <label className="grid gap-2">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                      Attach images
                    </span>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      multiple
                      onChange={handleImages}
                      className="border border-ink/15 bg-bone px-4 py-4 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-tell file:px-5 file:py-3 file:font-mono file:text-[0.68rem] file:font-bold file:uppercase file:tracking-[0.14em] file:text-bone"
                    />
                  </label>

                  <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.14em] text-muted">
                    2MB maximum per image. Add product photos, package labels,
                    receipts, or damage evidence.
                  </p>

                  {form.images.length > 0 && (
                    <div className="grid gap-2">
                      {form.images.map((file) => (
                        <div
                          key={`${file.name}-${file.size}`}
                          className="flex flex-wrap items-center justify-between gap-3 border border-ink/10 bg-bone px-3 py-2"
                        >
                          <span className="text-sm font-bold text-ink">
                            {file.name}
                          </span>

                          <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button className="rounded-full bg-tell px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep sm:col-span-2">
                  Send support request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}