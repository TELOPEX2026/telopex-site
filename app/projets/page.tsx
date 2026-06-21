import { getAllProjects } from "@/lib/mdx";
import ProjectCard from "@/components/ProjectCard";

export const metadata = { title: "Projets — Telopex" };

export default function ProjetsPage() {
  const projects = getAllProjects();

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold">Projets</h1>
      <p className="mt-2 text-paper/70">
        Ce qui est construit, testé, et déployé en vrai.
      </p>

      {projects.length === 0 ? (
        <div className="mt-12 rounded-lg border border-dashed border-paper/15 p-8 text-center text-paper/60">
          Rien à montrer ici pour l&apos;instant — le premier projet arrive bientôt.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
