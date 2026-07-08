export default function LogoutConfirmModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center px-4" role="dialog" aria-modal="true" aria-label="Confirm sign out">
      <button
        type="button"
        onClick={onCancel}
        className="absolute inset-0 cursor-default bg-ink/35"
        aria-label="Cancel sign out"
      />

      <section className="relative w-full max-w-xl border border-ink/12 bg-paper p-6 shadow-panel">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Confirm sign out</p>
        <h2 className="mt-4 text-5xl font-black leading-none tracking-[-0.07em]">Leave your account?</h2>
        <p className="mt-5 text-lg leading-8 text-ink/70">
          You will need to log in and verify with OTP again before checkout, profile, or order pages.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
          >
            Sign out
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-ink/15 px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-ink transition hover:border-tell hover:text-tell-deep"
          >
            Stay signed in
          </button>
        </div>
      </section>
    </div>
  );
}
