import Link from "./Link";

const assets = {
  secondaryLogo: "/logos/secondary-logo1.png"
};

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "About Tell20", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Support", href: "/support" }
];

const supportItems = [
  "OTP-protected checkout",
  "14-day easy returns",
  "Free delivery above KSh 15,000",
  "Fast 48-hour dispatch"
];

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-bone/10 bg-ink text-bone">
      <div className="mx-auto grid max-w-report gap-12 px-4 pb-20 pt-12 sm:px-6 sm:pb-24 lg:grid-cols-[1.15fr_2fr] lg:px-8 lg:pb-28 lg:pt-16">
        <div>
          <Link href="/" aria-label="Tell20 home" className="block max-w-xs">
            <img
              src={assets.secondaryLogo}
              alt="Tell20"
              className="h-auto w-full object-contain"
            />
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-6 text-bone/65">
            Tell20 is an online store for useful everyday pieces: wear, carry,
            home, repeat. Shop plenty, tell twenty.
          </p>

          <p className="mt-6 max-w-sm font-mono text-[0.68rem] uppercase leading-5 tracking-[0.16em] text-bone/40">
            Estd. 2026 · Located in Kenya
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/45">
              Store
            </p>

            <div className="mt-4 grid gap-3 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  className="text-bone/75 transition hover:text-tell-light"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/45">
              Service
            </p>

            <div className="mt-4 grid gap-3 text-sm">
              {supportItems.map((item) => (
                <span key={item} className="text-bone/75">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-bone/45">
              Brand
            </p>

            <p className="mt-4 text-sm leading-6 text-bone/75">
              Curated essentials selected for repeat use, simple checkout, clear
              returns, and products worth recommending.
            </p>

            <p className="mt-5 font-mono text-[0.68rem] uppercase leading-5 tracking-[0.16em] text-tell-light/80">
              Designed by William Writes Code
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-44 overflow-hidden bg-ink sm:h-52 lg:h-60">
        <svg
          className="absolute bottom-0 left-0 h-full w-[180%] -translate-x-[18%] text-tell-deep"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,120 C120,70 240,170 360,120 C480,70 600,40 720,92 C840,145 960,200 1080,145 C1200,90 1320,70 1440,120 L1440,240 L0,240 Z"
          />
        </svg>

        <svg
          className="absolute bottom-0 left-0 h-[82%] w-[180%] -translate-x-[8%] text-tell"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,132 C130,190 260,78 390,130 C520,182 650,202 780,140 C910,78 1040,62 1170,118 C1300,174 1370,156 1440,120 L1440,240 L0,240 Z"
          />
        </svg>

        <svg
          className="absolute bottom-0 left-0 h-[62%] w-[180%] -translate-x-[14%] text-bone"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,145 C160,85 320,205 480,145 C640,85 800,92 960,150 C1120,208 1280,105 1440,150 L1440,240 L0,240 Z"
          />
        </svg>
      </div>

      <div className="bg-bone px-4 py-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-ink/55">
        © 2026 Tell20. Shop plenty, tell twenty.
      </div>
    </footer>
  );
}
