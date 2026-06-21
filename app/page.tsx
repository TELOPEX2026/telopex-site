import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-paper/10">
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
          <defs>
            <pattern id="contours" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="20" fill="none" stroke="var(--color-paper)" strokeWidth="1" />
              <circle cx="60" cy="60" r="40" fill="none" stroke="var(--color-paper)" strokeWidth="1" />
              <circle cx="60" cy="60" r="58" fill="none" stroke="var(--color-paper)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contours)" />
        </svg>

        <div className="relative mx-auto max-w-3xl px-6 py-24 sm:py-32">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-signal">Telos aPex</p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
            Le but, c&apos;est le <span className="text-signal">sommet</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/80">
            Telopex construit des outils web et IA — boutiques en ligne, chatbots,
            automatisations — pensés et codés depuis zéro, entièrement depuis un téléphone.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/projets" className="rounded-md bg-signal px-6 py-3 text-sm font-medium text-ink transition hover:opacity-90">
              Voir les projets
            </a>
            <a href="/a-propos" className="rounded-md border border-paper/30 px-6 py-3 text-sm font-medium text-paper transition hover:border-paper/60">
              Le parcours
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-sm uppercase tracking-[0.2em] text-paper/50">En cours de construction</h2>
        <div className="mt-8 space-y-6">
          <article className="rounded-lg border border-paper/10 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Template e-commerce CI</h3>
              <span className="rounded-full bg-signal/10 px-3 py-1 text-xs text-signal">Bientôt</span>
            </div>
            <p className="mt-2 text-sm text-paper/70">
              Boutique Next.js prête à l&apos;emploi, intégration native CinetPay / Wave / Orange Money.
            </p>
          </article>

          <article className="rounded-lg border border-paper/10 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Coder depuis un téléphone</h3>
              <span className="rounded-full bg-signal/10 px-3 py-1 text-xs text-signal">Bientôt</span>
            </div>
            <p className="mt-2 text-sm text-paper/70">
              Le guide pour développer et déployer sans ordinateur, avec Termux.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-paper/10">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-xl font-medium">Suivre le projet</h2>
          <p className="mt-2 text-sm text-paper/70">Un mot quand un nouvel outil sort, pas plus.</p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
