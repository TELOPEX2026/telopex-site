import Link from "next/link";
import type { Project } from "@/types";
import Card from "@/components/ui/Card";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projets/${project.slug}`}>
      <Card>
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-medium">{project.title}</h3>
          <span className="shrink-0 rounded-full bg-signal/10 px-3 py-1 text-xs text-signal">
            {project.status}
          </span>
        </div>
        <p className="mt-2 text-sm text-paper/70">{project.description}</p>
      </Card>
    </Link>
  );
}
