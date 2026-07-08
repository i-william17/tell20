import { useState } from "react";
import { toast } from "react-toastify";
import AnimatedSection from "../AnimatedSection";

const initialReview = {
  author: "",
  rating: "5",
  title: "",
  body: ""
};

const reviewTones = [
  {
    card: "bg-ink text-bone",
    meta: "text-bone/50",
    body: "text-bone/70",
    title: "text-bone"
  },
  {
    card: "bg-[#DCE8DD] text-ink",
    meta: "text-ink/50",
    body: "text-ink/70",
    title: "text-ink"
  },
  {
    card: "bg-tell text-bone",
    meta: "text-bone/60",
    body: "text-bone/75",
    title: "text-bone"
  },
  {
    card: "bg-bone text-ink",
    meta: "text-ink/50",
    body: "text-ink/70",
    title: "text-ink"
  }
];

const inputClass =
  "h-12 border border-ink/15 bg-paper px-3 text-sm outline-none transition focus:border-tell";

const selectClass =
  "h-12 border border-ink/15 bg-paper px-3 font-mono text-xs uppercase tracking-[0.12em] outline-none transition focus:border-tell";

const textareaClass =
  "resize-none border border-ink/15 bg-paper px-3 py-3 text-sm outline-none transition focus:border-tell";

export default function ProductReviews({ onAddReview, reviews = [] }) {
  const [form, setForm] = useState(initialReview);

  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value
    }));
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + Number(review.rating), 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const submitReview = (event) => {
    event.preventDefault();

    const cleanReview = {
      author: form.author.trim(),
      rating: Number(form.rating),
      title: form.title.trim(),
      body: form.body.trim(),
      date: new Date().toISOString().slice(0, 10)
    };

    if (!cleanReview.author || !cleanReview.title || !cleanReview.body) {
      toast.error("Please complete all review fields.");
      return;
    }

    onAddReview(cleanReview);
    setForm(initialReview);
    toast.success("Review added. Thanks for rating this product.");
  };

  return (
    <AnimatedSection className="overflow-hidden bg-paper px-4 pb-10 text-ink sm:px-6 sm:pb-14 lg:px-8">
      <div className="mx-auto max-w-report">
        <div className="grid gap-6 lg:grid-cols-[1fr_21rem] lg:items-start">
          <div>
            <div className="grid overflow-hidden border border-ink/10 bg-paper lg:grid-cols-[0.34fr_1fr]">
              <aside className="bg-ink p-5 text-bone sm:p-6">
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/50">
                  Customer rating
                </p>

                <p className="mt-6 text-5xl font-black leading-none tracking-[-0.08em] sm:text-6xl">
                  {averageRating}
                </p>

                <p className="mt-5 max-w-xs text-sm leading-6 text-bone/65">
                  Based on {reviews.length} customer{" "}
                  {reviews.length === 1 ? "review" : "reviews"}.
                </p>
              </aside>

              <div className="bg-bone p-5 sm:p-6 lg:p-7">
                <h2 className="max-w-5xl text-balance text-3xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl">
                  Reviews that explain the{" "}
                  <em className="italic text-tell">repeat buy</em>.
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
                  See what customers say about fit, quality, delivery, and daily
                  use before adding this piece to your cart.
                </p>
              </div>
            </div>

            {reviews.length > 0 ? (
              <div className="mt-6 grid overflow-hidden border border-ink/10 bg-ink/10 lg:grid-cols-2">
                {reviews.map((review, index) => {
                  const tone = reviewTones[index % reviewTones.length];

                  return (
                    <article
                      key={`${review.author}-${review.date}-${review.title}`}
                      className={`min-h-[13rem] border border-ink/10 p-5 sm:p-6 ${tone.card}`}
                    >
                      <div
                        className={`flex flex-wrap items-center justify-between gap-3 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] ${tone.meta}`}
                      >
                        <span>{review.author}</span>
                        <span>Rated {Number(review.rating).toFixed(1)}</span>
                      </div>

                      <h3
                        className={`mt-5 text-2xl font-black leading-[0.95] tracking-[-0.05em] ${tone.title}`}
                      >
                        {review.title}
                      </h3>

                      <p className={`mt-4 text-sm leading-6 ${tone.body}`}>
                        {review.body}
                      </p>

                      <p
                        className={`mt-8 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${tone.meta}`}
                      >
                        {review.date}
                      </p>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-10 overflow-hidden border border-ink/10 bg-paper">
                <div className="grid lg:grid-cols-[0.34fr_1fr]">
                  <aside className="bg-tell p-6 text-bone sm:p-8">
                    <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/60">
                      No reviews
                    </p>

                    <p className="mt-8 text-7xl font-black leading-none tracking-[-0.08em] sm:text-8xl">
                      0
                    </p>
                  </aside>

                  <div className="bg-bone p-6 sm:p-8">
                    <h3 className="text-4xl font-black leading-[0.9] tracking-[-0.06em]">
                      Be the <em className="italic text-tell">first</em> to
                      rate this product.
                    </h3>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-ink/70">
                      Share your experience with fit, quality, delivery, and
                      everyday use.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form
            className="overflow-hidden border border-ink/10 bg-paper lg:sticky lg:top-28"
            onSubmit={submitReview}
          >
            <div className="bg-ink p-5 text-bone">
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-bone/50">
                Rate this product
              </p>

              <h3 className="mt-3 text-2xl font-black leading-[0.95] tracking-[-0.05em]">
                Add a <em className="italic text-tell-light">review</em>.
              </h3>

              <p className="mt-4 text-sm leading-6 text-bone/65">
                Help the next customer decide with a clear, honest review.
              </p>
            </div>

            <div className="grid gap-3 bg-bone p-4 sm:p-5">
              <label className="grid gap-2">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  Name *
                </span>

                <input
                  value={form.author}
                  onChange={(event) => updateField("author", event.target.value)}
                  required
                  className={inputClass}
                />
              </label>

              <label className="grid gap-2">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  Rating *
                </span>

                <select
                  value={form.rating}
                  onChange={(event) => updateField("rating", event.target.value)}
                  required
                  className={selectClass}
                >
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Fair</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Bad</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  Review title *
                </span>

                <input
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                  required
                  className={inputClass}
                />
              </label>

              <label className="grid gap-2">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
                  Review *
                </span>

                <textarea
                  value={form.body}
                  onChange={(event) => updateField("body", event.target.value)}
                  required
                  rows={5}
                  className={textareaClass}
                />
              </label>

              <button className="mt-2 w-full rounded-full bg-tell px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-bone transition hover:bg-tell-deep">
                Submit review
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}
