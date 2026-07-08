export default function AccountStats({ cartCount, email, wishlistCount }) {
  const stats = [
    {
      label: "Signed in",
      value: email,
      note: "Your active Tell20 account.",
      tone: "dark"
    },
    {
      label: "Cart",
      value: cartCount,
      note: "Pieces ready for checkout.",
      tone: "sage"
    },
    {
      label: "Wishlist",
      value: wishlistCount,
      note: "Saved items to revisit later.",
      tone: "tell"
    }
  ];

  const tones = {
    dark: {
      card: "bg-ink text-bone border-bone/10",
      label: "text-bone/55",
      value: "text-bone",
      note: "text-bone/65"
    },
    sage: {
      card: "bg-[#DCE8DD] text-ink border-black/5",
      label: "text-ink/50",
      value: "text-ink",
      note: "text-ink/65"
    },
    tell: {
      card: "bg-tell text-bone border-tell-deep/10",
      label: "text-bone/65",
      value: "text-bone",
      note: "text-bone/75"
    }
  };

  return (
    <div className="mt-10 grid overflow-hidden border border-ink/10 bg-paper lg:grid-cols-3">
      {stats.map((item) => {
        const tone = tones[item.tone];

        return (
          <article
            key={item.label}
            className={`flex min-h-[18rem] flex-col justify-between border p-6 sm:p-8 ${tone.card}`}
          >
            <div>
              <p
                className={`font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] ${tone.label}`}
              >
                {item.label}
              </p>

              <p
                className={`mt-8 font-black leading-[0.85] tracking-[-0.07em] ${
                  item.label === "Signed in"
                    ? "break-words text-4xl sm:text-5xl"
                    : "text-[5.5rem] sm:text-[6.8rem]"
                } ${tone.value}`}
              >
                {item.value}
              </p>
            </div>

            <p className={`mt-8 max-w-xs text-sm leading-6 ${tone.note}`}>
              {item.note}
            </p>
          </article>
        );
      })}
    </div>
  );
}