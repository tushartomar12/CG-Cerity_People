import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [];
}

export default function InsightArticlePage() {
  notFound();
}
