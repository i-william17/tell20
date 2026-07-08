import { useMemo, useState } from "react";
import PhoneField from "../forms/PhoneField";
import Link from "../Link";
import { getLegalContent } from "../../data/legalContent";

const passwordChecks = [
  ["length", "At least 8 characters"],
  ["lower", "One lowercase letter"],
  ["upper", "One uppercase letter"],
  ["number", "One number"],
  ["symbol", "One symbol"]
];

export default function AuthRegisterPanel({ form, onChange, onSubmit }) {
  const [legalModal, setLegalModal] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const activeLegalContent = legalModal ? getLegalContent(legalModal) : null;

  const checks = useMemo(
    () => ({
      length: form.password.length >= 8,
      lower: /[a-z]/.test(form.password),
      upper: /[A-Z]/.test(form.password),
      number: /\d/.test(form.password),
      symbol: /[^A-Za-z0-9]/.test(form.password)
    }),
    [form.password]
  );

  return (
    <section className="overflow-hidden bg-paper text-ink">
      <div className="grid min-h-[calc(100vh-4.25rem)] border-b border-ink/10 lg:grid-cols-[0.38fr_1fr]">
        <aside className="flex flex-col justify-between border-b border-ink/10 bg-ink px-4 py-6 text-bone sm:px-6 lg:border-b-0 lg:border-r lg:px-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone/55">
              Join Tell20
            </p>

            <h2 className="mt-6 max-w-sm text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-6xl">
              One account for wishlist, cart, and checkout.
            </h2>

            <p className="mt-6 max-w-xs text-base leading-7 text-bone/65">
              Create your Tell20 account to save pieces, manage orders, and use
              OTP-protected checkout.
            </p>
          </div>

          <div className="mt-12">
            <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.16em] text-bone/40">
              Already registered?
            </p>

            <Link
              href="/login"
              className="mt-3 inline-flex rounded-full border border-bone/15 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:border-tell-light hover:text-tell-light"
            >
              Sign in
            </Link>
          </div>
        </aside>

        <div className="grid lg:grid-rows-[16rem_1fr]">
          <div className="hidden border-b border-ink/10 bg-tell lg:block">
            <div className="flex h-full items-end px-8 py-7">
              <p className="max-w-xl text-4xl font-black leading-[0.9] tracking-[-0.06em] text-bone">
                Create access for wishlist, checkout, and order support.
              </p>
            </div>
          </div>

          <div className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl">
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                Secure registration
              </p>

              <h1 className="mt-4 max-w-4xl text-balance text-6xl font-black leading-[0.86] tracking-[-0.075em] sm:text-8xl">
                <em className="italic text-tell">Create</em> account.
              </h1>

              <p className="mt-6 max-w-2xl text-xl leading-8 text-ink/70">
                Set up your Tell20 profile for saved items, checkout, delivery,
                and order support.
              </p>

              <form
                className="mt-10 grid gap-5 border border-ink/12 bg-bone p-5 shadow-panel sm:grid-cols-2 sm:p-6"
                onSubmit={onSubmit}
              >
                <label className="grid gap-2 sm:col-span-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Full name *
                  </span>

                  <input
                    value={form.fullName}
                    onChange={(event) =>
                      onChange("fullName", event.target.value)
                    }
                    autoComplete="name"
                    required
                    className="h-14 border border-ink/15 bg-paper px-4 text-lg outline-none transition focus:border-tell"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Email *
                  </span>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => onChange("email", event.target.value)}
                    autoComplete="email"
                    required
                    className="h-14 border border-ink/15 bg-paper px-4 text-lg outline-none transition focus:border-tell"
                  />
                </label>

                <PhoneField
                  value={form.phone}
                  onChange={(value) => onChange("phone", value)}
                  required
                />

                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Password *
                  </span>

                  <span className="grid grid-cols-[1fr_auto] border border-ink/15 bg-paper transition focus-within:border-tell">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(event) =>
                        onChange("password", event.target.value)
                      }
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="h-14 min-w-0 bg-transparent px-4 text-lg outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="border-l border-ink/10 px-4 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-tell-deep transition hover:bg-tell-soft"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </span>
                </label>

                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Confirm password *
                  </span>

                  <span className="grid grid-cols-[1fr_auto] border border-ink/15 bg-paper transition focus-within:border-tell">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(event) =>
                        onChange("confirmPassword", event.target.value)
                      }
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="h-14 min-w-0 bg-transparent px-4 text-lg outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      className="border-l border-ink/10 px-4 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-tell-deep transition hover:bg-tell-soft"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </span>
                </label>

                <div className="grid gap-3 border border-ink/12 bg-paper p-4 sm:col-span-2">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                    Strong password checks
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {passwordChecks.map(([key, label]) => (
                      <p
                        key={key}
                        className={`text-sm leading-6 ${
                          checks[key] ? "text-tell-deep" : "text-ink/55"
                        }`}
                      >
                        <span className="font-bold">
                          {checks[key] ? "Passed" : "Needed"}
                        </span>{" "}
                        / {label}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 border border-ink/12 bg-paper p-4 sm:col-span-2">
                  <input
                    id="register-legal-agreement"
                    type="checkbox"
                    checked={form.acceptTerms}
                    onChange={(event) =>
                      onChange("acceptTerms", event.target.checked)
                    }
                    required
                    className="mt-1 h-4 w-4 accent-[#078B88]"
                  />

                  <span className="text-sm leading-6 text-ink/70">
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() => setLegalModal("terms")}
                      className="font-bold text-tell-deep underline underline-offset-4"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={() => setLegalModal("privacy")}
                      className="font-bold text-tell-deep underline underline-offset-4"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </div>

                <button className="rounded-full bg-tell px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep sm:col-span-2">
                  Create account
                </button>
              </form>

              <div className="mt-6 grid gap-3 border-t border-ink/10 pt-6 sm:grid-cols-2">
                <p className="text-sm leading-6 text-ink/70">
                  Already have a Tell20 account?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-tell-deep underline underline-offset-4"
                  >
                    Login
                  </Link>
                  .
                </p>

                <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.16em] text-ink/45 sm:text-right">
                  OTP checkout · Wishlist sync · Order support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeLegalContent && (
        <div
          className="fixed inset-0 z-[110] grid place-items-center px-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLegalModal("")}
            className="absolute inset-0 cursor-default bg-ink/45"
            aria-label={`Close ${activeLegalContent.label}`}
          />

          <article className="relative flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden border border-ink/12 bg-paper shadow-panel">
            <div className="border-b border-ink/10 bg-ink p-6 text-bone">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-bone/50">
                Tell20 legal
              </p>

              <h2 className="mt-4 text-5xl font-black leading-none tracking-[-0.07em]">
                {activeLegalContent.title}
              </h2>

              <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-bone/45">
                Last updated {activeLegalContent.lastUpdated}
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6">
              <p className="text-lg leading-8 text-ink/70">
                {activeLegalContent.intro}
              </p>

              <div className="mt-6 grid gap-5">
                {activeLegalContent.sections.map((section) => (
                  <section
                    key={section.title}
                    className="border-t border-ink/10 pt-5"
                  >
                    <h3 className="text-2xl font-black leading-none tracking-[-0.05em]">
                      {section.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-ink/70">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>

            <div className="border-t border-ink/10 p-6">
              <button
                type="button"
                onClick={() => setLegalModal("")}
                className="rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
              >
                I understand
              </button>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}