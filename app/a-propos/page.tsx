export const metadata = { title: "À propos — Telopex" };

export default function AProposPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold">À propos</h1>
      <div className="mt-6 space-y-4 text-paper/80">
        <p>
          Telopex est né d&apos;une contrainte simple : construire des outils
          web et IA sérieux, sans bureau, sans ordinateur, avec un seul
          téléphone Android et Termux comme environnement de travail.
        </p>
        <p>
          Le nom vient du grec telos (le but, la finalité) et du latin apex
          (le sommet). L&apos;idée : chaque outil construit vise un objectif
          précis, pas un effet de mode.
        </p>
        <p>Autodidacte, en formation continue, basé en Côte d&apos;Ivoire.</p>
      </div>
    </section>
  );
}
