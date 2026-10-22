import { CaseStudyView } from "@/components/case/case-study-view";
import { Footer } from "@/components/footer";
import { caseSlugs, getCaseStudy } from "@/lib/case-studies";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return {
    title: `${study.title.pt} — Alexa Cruz`,
    description: study.short.pt,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  if (!getCaseStudy(params.slug)) notFound();
  return (
    <main>
      <CaseStudyView slug={params.slug} />
      <Footer />
    </main>
  );
}
