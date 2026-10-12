import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${post.slug}`,
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: post.title, path: `/insights/${post.slug}` },
        ])}
      />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: post.title },
        ]}
      />
      <article className="relative overflow-hidden pb-8">
        <header className="container max-w-3xl py-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            {post.category}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy">{post.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{post.description}</p>
          <p className="mt-4 text-sm text-slate-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden> · </span>
            {post.readMinutes} min read
          </p>
          <div
            className={`mt-8 aspect-[21/9] rounded-xl bg-gradient-to-br ${post.imageGradient}`}
            role="img"
            aria-label=""
          />
        </header>
        <div className="container max-w-3xl space-y-6 text-slate-600 leading-relaxed">
          <p>
            This article is placeholder content ready to be replaced via CMS or API. It
            demonstrates routing at{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-navy">
              /insights/[slug]
            </code>{" "}
            with SEO metadata and structured breadcrumbs.
          </p>
          <h2 className="text-2xl font-semibold text-navy">Key takeaways</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Align HR technology decisions with business growth stages.</li>
            <li>Prioritize modules that remove the highest manual workload first.</li>
            <li>Measure success with compliance, cycle time, and employee experience metrics.</li>
          </ul>
          <p>
            For a tailored recommendation on HRMS, payroll, or consulting, speak with our
            team — we help SMBs and enterprises design scalable people operations.
          </p>
        </div>
        <div className="container max-w-3xl py-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to insights
          </Link>
        </div>
      </article>
      <CTASection
        title="Put insights into action"
        description="Book a consultation to apply these ideas to your organization."
      />
    </>
  );
}
