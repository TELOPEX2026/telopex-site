import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Project, Article } from "@/types";

const projectsDir = path.join(process.cwd(), "content/projets");
const articlesDir = path.join(process.cwd(), "content/blog");

function readDir(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      return { ...data, slug, content };
    });
}

export function getAllProjects(): Project[] {
  return readDir(projectsDir) as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAllArticles(): Article[] {
  return (readDir(articlesDir) as Article[]).sort((a, b) =>
    a.date < b.date ? 1 : -1
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}
