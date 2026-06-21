import Link from "next/link";
import type { Article } from "@/types";
import Card from "@/components/ui/Card";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <Card>
        <p className="text-xs uppercase tracking-wide text-paper/40">
          {article.date}
        </p>
        <h3 className="mt-2 font-medium">{article.title}</h3>
        <p className="mt-2 text-sm text-paper/70">{article.description}</p>
      </Card>
    </Link>
  );
}
