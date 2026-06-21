import { getAllArticles } from "@/lib/mdx";
import ArticleCard from "@/components/ArticleCard";

export const metadata = { title: "Blog — Telopex" };

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold">Blog</h1>
      <p className="mt-2 text-paper/70">
        Les problèmes résolus en vrai, documentés au fur et à mesure.
      </p>

      {articles.length === 0 ? (
        <div className="mt-12 rounded-lg border border-dashed border-paper/15 p-8 text-center text-paper/60">
          Premier article en écriture — reviens bientôt.
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </section>
  );
}
