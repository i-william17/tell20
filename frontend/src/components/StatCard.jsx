export default function StatCard({
  value,
  label,
  note,
  tone = "bone",
  dark = false
}) {
  const tones = {
    lavender: "bg-[#C9A8F5] text-black border-black/5",
    sage: "bg-[#DCE8DD] text-black border-black/5",
    bone: "bg-bone text-ink border-ink/10",
    tell: "bg-tell text-bone border-tell-deep/10",
    dark: "bg-ink text-bone border-bone/10"
  };

  const cardTone = dark ? tones.dark : tones[tone] || tones.bone;

  return (
    <article
      className={`flex min-h-[18rem] flex-col border p-5 sm:min-h-[22rem] sm:p-7 lg:min-h-[24rem] ${cardTone}`}
    >
      <p className="text-[5.5rem] font-black leading-[0.82] tracking-[-0.075em] sm:text-[6.8rem] lg:text-[7.8rem]">
        {value}
      </p>

      <div className="mt-6 max-w-sm">
        <p className="text-xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-2xl">
          {label}
        </p>

        {note && (
          <p
            className={`mt-3 max-w-xs text-base leading-6 tracking-[-0.025em] ${
              dark ? "text-bone/70" : "text-black/75"
            }`}
          >
            {note}
          </p>
        )}
      </div>
    </article>
  );
}