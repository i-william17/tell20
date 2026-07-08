import { useEffect, useState } from "react";

const storageKey = "tell20_cookie_consent";

const cookiePoints = [
  {
    label: "Cart",
    value: "Saved",
    tone: "dark"
  },
  {
    label: "Wishlist",
    value: "Kept",
    tone: "sage"
  },
  {
    label: "Login",
    value: "Secure",
    tone: "tell"
  }
];

const tones = {
  dark: {
    card: "bg-ink text-bone",
    label: "text-bone/50",
    value: "text-bone"
  },
  sage: {
    card: "bg-[#DCE8DD] text-ink",
    label: "text-ink/50",
    value: "text-ink"
  },
  tell: {
    card: "bg-tell text-bone",
    label: "text-bone/60",
    value: "text-bone"
  }
};

export default function CookieConsentModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(storageKey) !== "accepted");
  }, []);

  const acceptCookies = () => {
    window.localStorage.setItem(storageKey, "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[110] px-4 pb-4 sm:px-6 sm:pb-6">
      <section className="mx-auto max-w-report overflow-hidden border border-ink/12 bg-paper shadow-panel">
        <div className="grid lg:grid-cols-[0.34fr_1fr]">
          <aside className="flex flex-col justify-between bg-ink p-5 text-bone sm:p-6">
            <div>
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/50">
                Tell20 cookies
              </p>

              <p className="mt-6 text-5xl font-black leading-none tracking-[-0.075em] sm:text-6xl">
                T20
              </p>
            </div>

            <p className="mt-8 max-w-xs text-sm leading-6 text-bone/60">
              Essential browser storage keeps the store usable on this device.
            </p>
          </aside>

          <div className="p-5 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-muted">
                  Cookie notice
                </p>

                <h2 className="mt-3 max-w-3xl text-balance text-4xl font-black leading-[0.9] tracking-[-0.06em] sm:text-5xl">
                  We use cookies to keep{" "}
                  <em className="italic text-tell">Tell20</em> useful.
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-ink/70">
                  We store essential preferences like cart, wishlist,
                  authentication state, and cookie consent on this device.
                </p>
              </div>

              <button
                type="button"
                onClick={acceptCookies}
                className="rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
              >
                Accept cookies
              </button>
            </div>

            <div className="mt-6 grid overflow-hidden border border-ink/10 bg-paper sm:grid-cols-3">
              {cookiePoints.map((item) => {
                const tone = tones[item.tone];

                return (
                  <article key={item.label} className={`border p-4 ${tone.card}`}>
                    <p
                      className={`font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] ${tone.label}`}
                    >
                      {item.label}
                    </p>

                    <p
                      className={`mt-3 text-2xl font-black leading-none tracking-[-0.055em] ${tone.value}`}
                    >
                      {item.value}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}