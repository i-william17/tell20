import { useState } from "react";
import AnimatedSection from "../AnimatedSection";

const faqs = [
  {
    question: "Do I need an account?",
    answer:
      "No password is required. You verify by email OTP when entering protected areas such as checkout and account."
  },
  {
    question: "Where does Tell20 ship?",
    answer:
      "The interface is ready for regional delivery rules. In this build, delivery is modeled as a KSh 450 service fee with free shipping above KSh 15,000."
  },
  {
    question: "How are products selected?",
    answer:
      "Products are selected around utility, repeat wear, material quality, and whether they make sense beside the rest of the edit."
  },
  {
    question: "Can the wishlist sync across devices?",
    answer:
      "Wishlist items can be tied to the verified customer email after sign-in, so saved pieces stay available beyond a single session."
  }
];

export default function AboutFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <AnimatedSection className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-report">
        <h2 className="max-w-5xl text-balance text-5xl font-black leading-[0.9] tracking-[-0.065em] sm:text-7xl">
          Questions customers ask before{" "}
          <em className="italic text-tell">buying</em>.
        </h2>

        <div className="mt-10 overflow-hidden border border-ink/12 bg-ink/12">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article key={item.question} className="border-b border-ink/12 last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className={`grid w-full gap-5 p-6 text-left transition sm:p-8 lg:grid-cols-[0.45fr_0.55fr] ${
                    isOpen ? "bg-ink text-bone" : "bg-bone text-ink hover:bg-[#DCE8DD]"
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-5">
                    <h3 className="text-3xl font-black leading-none tracking-[-0.05em]">
                      {item.question}
                    </h3>

                    <span
                      className={`shrink-0 text-4xl font-black leading-none transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-tell-light" : "text-tell"
                      }`}
                    >
                      +
                    </span>
                  </div>

                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className={`text-base leading-7 ${isOpen ? "text-bone/72" : "text-ink/70"}`}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}