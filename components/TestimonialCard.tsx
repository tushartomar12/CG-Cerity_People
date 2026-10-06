import { Quote, Star } from "lucide-react";

export function TestimonialCard({
  quote,
  author,
  role,
  company,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
}) {
  return (
    <blockquote className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <Quote className="h-8 w-8 text-blue-100" aria-hidden />
        <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
          ))}
        </div>
      </div>
      <p className="mt-4 flex-1 text-slate-700 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-6 border-t border-slate-100 pt-4">
        <cite className="not-italic">
          <span className="block font-semibold text-navy">{author}</span>
          <span className="text-sm text-slate-500">
            {role}, {company}
          </span>
        </cite>
      </footer>
    </blockquote>
  );
}
