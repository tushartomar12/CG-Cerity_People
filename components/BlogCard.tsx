import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/lib/data";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`aspect-[16/9] bg-gradient-to-br ${post.imageGradient}`}
        role="img"
        aria-label=""
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {post.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-navy group-hover:text-brand">
          <Link href={`/insights/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
          {post.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.readMinutes} min read
          </span>
        </div>
        <Link
          href={`/insights/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
