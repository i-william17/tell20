import AnimatedSection from "../AnimatedSection";
import Link from "../Link";

export default function AuthOtpPanel({
  code,
  error,
  onCodeChange,
  onSubmit,
  pendingEmail
}) {
  return (
    <AnimatedSection className="overflow-hidden bg-paper text-ink">
      <div className="grid min-h-[calc(100vh-4.25rem)] border-b border-ink/10 lg:grid-cols-[0.38fr_1fr]">
        <aside className="flex flex-col justify-between border-b border-ink/10 bg-ink px-4 py-6 text-bone sm:px-6 lg:border-b-0 lg:border-r lg:px-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone/55">
              Tell20 verification
            </p>

            <h2 className="mt-6 max-w-sm text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-6xl">
              One more step before checkout.
            </h2>

            <p className="mt-6 max-w-xs text-base leading-7 text-bone/65">
              Enter the OTP code to activate your Tell20 account on this device
              and continue securely.
            </p>
          </div>

          <div className="mt-12">
            <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.16em] text-bone/40">
              Wrong email?
            </p>

            <Link
              href="/login"
              className="mt-3 inline-flex rounded-full border border-bone/15 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:border-tell-light hover:text-tell-light"
            >
              Use another email
            </Link>
          </div>
        </aside>

        <div className="grid lg:grid-rows-[16rem_1fr]">
          <div className="hidden border-b border-ink/10 bg-tell lg:block">
            <div className="flex h-full items-end px-8 py-7">
              <p className="max-w-xl text-4xl font-black leading-[0.9] tracking-[-0.06em] text-bone">
                Secure OTP access for checkout and saved pieces.
              </p>
            </div>
          </div>

          <div className="flex items-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-3xl">
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                OTP protected access
              </p>

              <h1 className="mt-4 text-balance text-6xl font-black leading-[0.86] tracking-[-0.075em] sm:text-8xl">
                <em className="italic text-tell">Verify</em> code.
              </h1>

              <p className="mt-6 max-w-xl text-xl leading-8 text-ink/70">
                We sent a one-time code to{" "}
                <span className="font-semibold text-ink">{pendingEmail}</span>.
                For this local build, enter{" "}
                <span className="font-semibold text-tell-deep">2026</span>.
              </p>

              <form
                className="mt-10 grid gap-5 border border-ink/12 bg-bone p-5 shadow-panel sm:p-6"
                onSubmit={onSubmit}
              >
                <label className="grid gap-2">
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    One-time code *
                  </span>

                  <input
                    id="otp"
                    inputMode="numeric"
                    value={code}
                    onChange={(event) => onCodeChange(event.target.value)}
                    placeholder="2026"
                    required
                    maxLength={6}
                    className="h-16 border border-ink/15 bg-paper px-5 text-center text-2xl font-black tracking-[0.45em] text-ink outline-none transition placeholder:text-ink/30 focus:border-tell"
                  />
                </label>

                <button className="rounded-full bg-tell px-7 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep">
                  Verify account
                </button>
              </form>

              {error && (
                <p className="mt-4 border border-tell/20 bg-tell-soft px-4 py-3 text-sm font-bold leading-6 text-tell-deep">
                  {error}
                </p>
              )}

              <div className="mt-6 grid gap-3 border-t border-ink/10 pt-6 sm:grid-cols-2">
                <p className="text-sm leading-6 text-ink/70">
                  Need to change the email?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-tell-deep underline underline-offset-4"
                  >
                    Sign in again
                  </Link>
                  .
                </p>

                <p className="font-mono text-[0.68rem] uppercase leading-5 tracking-[0.16em] text-ink/45 sm:text-right">
                  Secure OTP · Saved wishlist · Checkout access
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}