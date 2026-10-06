export function FAQSection({
  title = "Frequently asked questions",
  faqs,
}: {
  title?: string;
  faqs: { question: string; answer: string }[];
}) {
  return (
    <section className="section-padding bg-slate-50" aria-labelledby="faq-heading">
      <div className="container max-w-3xl">
        <h2 id="faq-heading" className="text-center text-3xl font-bold text-navy sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          Clear answers before you book a consultation.
        </p>
        <dl className="mt-10 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <dt className="flex gap-3 font-semibold text-navy">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-brand"
                  aria-hidden
                >
                  {i + 1}
                </span>
                {faq.question}
              </dt>
              <dd className="mt-3 pl-10 text-sm leading-relaxed text-slate-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
