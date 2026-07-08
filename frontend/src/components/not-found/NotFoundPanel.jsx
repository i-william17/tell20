import Link from "../Link";

export default function NotFoundPanel() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-4 py-20 text-center">
      <div>
        <h1 className="text-6xl font-black tracking-[-0.06em] sm:text-8xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-ink/70">
          This route is not part of the Tell20 store.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
