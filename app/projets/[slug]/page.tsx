import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/mdx";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.2em] text-signal">
        {project.status}
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{project.title}</h1>
      <p className="mt-4 text-paper/70">{project.description}</p>

      {project.stack && project.stack.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-paper/15 px-3 py-1 text-xs text-paper/60"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mdx-content mt-10">
        <MDXRemote source={project.content} />
      </div>
    </article>
  );
}
