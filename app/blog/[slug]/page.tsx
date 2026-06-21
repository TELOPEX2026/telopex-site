import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-paper/40">
        {article.date}
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{article.title}</h1>
      <div className="mdx-content mt-10">
        <MDXRemote source={article.content} />
      </div>
    </article>
  );
}
