import { useState } from "react";
import Link from "../Link";

export default function AuthLoginPanel({ form, message, onChange, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="overflow-hidden bg-paper text-ink">
      <div className="grid min-h-[calc(100vh-4.25rem)] border-b border-ink/10 lg:grid-cols-[0.38fr_1fr]">
        <aside className="flex flex-col justify-between border-b border-ink/10 bg-ink px-4 py-6 text-bone sm:px-6 lg:border-b-0 lg:border-r lg:px-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone/55">
              Tell20 account
            </p>

            <h2 className="mt-6 max-w-sm text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-6xl">
              Saved pieces, orders, and checkout in one place.
            </h2>

            <p className="mt-6 max-w-xs text-base leading-7 text-bone/65">
              Sign in to manage saved items, order details, support requests,
              and OTP-protected checkout.
            </p>
          </div>

          <div className="mt-12">
            <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.16em] text-bone/40">
              New here?
            </p>

            <Link
              href="/register"
              className="mt-3 inline-flex rounded-full border border-bone/15 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:border-tell-light hover:text-tell-light"
            >
              Create account
            </Link>
          </div>
        </aside>

        <div className="grid lg:grid-rows-[16rem_1fr]">
          <div className="hidden border-b border-ink/10 bg-tell lg:block">
            <div className="flex h-full items-end px-8 py-7">
              <p className="max-w-xl text-4xl font-black leading-[0.9] tracking-[-0.06em] text-bone">
                Secure access for saved pieces and checkout.
              </p>
            </div>
          </div>

          <div className="flex items-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                Secure sign in
              </p>

              <h1 className="mt-4 text-balance text-6xl font-black leading-[0.86] tracking-[-0.075em] sm:text-8xl">
                <em className="italic text-tell">Sign</em> in.
              </h1>

              <p className="mt-6 max-w-xl text-xl leading-8 text-ink/70">
                {message}
              </p>

              <form
                className="mt-10 grid gap-5 border border-ink/12 bg-bone p-5 shadow-panel sm:p-6"
                onSubmit={onSubmit}
              >
                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Username *
                  </span>

                  <input
                    value={form.username}
                    onChange={(event) =>
                      onChange("username", event.target.value)
                    }
                    placeholder="username or email"
                    autoComplete="username"
                    required
                    className="h-14 border border-ink/15 bg-paper px-4 text-lg outline-none transition focus:border-tell"
                  />
                </label>

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
                      placeholder="Your password"
                      autoComplete="current-password"
                      required
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

                <button className="mt-2 rounded-full bg-tell px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep">
                  Continue to OTP
                </button>
              </form>

              <div className="mt-6 grid gap-3 border-t border-ink/10 pt-6 sm:grid-cols-2">
                <p className="text-sm leading-6 text-ink/70">
                  New to Tell20?{" "}
                  <Link
                    href="/register"
                    className="font-bold text-tell-deep underline underline-offset-4"
                  >
                    Create an account
                  </Link>
                  .
                </p>

                <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.16em] text-ink/45 sm:text-right">
                  OTP-protected checkout · Saved wishlist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}