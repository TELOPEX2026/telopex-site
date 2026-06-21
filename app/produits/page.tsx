const produits = [
  {
    id: "template",
    title: "Template e-commerce CI",
    description:
      "Boutique Next.js prête à l'emploi, intégration CinetPay / Wave / Orange Money incluse.",
    status: "Bientôt disponible",
  },
  {
    id: "formation",
    title: "Coder depuis un téléphone",
    description:
      "Le guide complet pour développer et déployer une application sans ordinateur, avec Termux.",
    status: "Bientôt disponible",
  },
  {
    id: "chatbot",
    title: "Kit chatbot IA",
    description:
      "Intégration prête à l'emploi pour brancher un chatbot IA (Gemini, Claude, Ollama) sur un site existant.",
    status: "Bientôt disponible",
  },
];

export const metadata = { title: "Produits — Telopex" };

export default function ProduitsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold">Produits</h1>
      <p className="mt-2 text-paper/70">
        Des outils packagés à partir de ce qui est réellement construit pour Telopex.
      </p>

      <div className="mt-10 space-y-6">
        {produits.map((p) => (
          <div
            key={p.id}
            id={p.id}
            className="scroll-mt-24 rounded-lg border border-paper/10 p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-medium">{p.title}</h2>
              <span className="shrink-0 rounded-full bg-signal/10 px-3 py-1 text-xs text-signal">
                {p.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-paper/70">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
