"use client";

import { useState } from "react";
import Link from "next/link";

const nav = [
  { label: "Accueil", href: "/" },
  { label: "Projets", href: "/projets" },
  {
    label: "Produits",
    children: [
      { label: "Template e-commerce", href: "/produits#template" },
      { label: "Formation mobile-first", href: "/produits#formation" },
      { label: "Kit chatbot IA", href: "/produits#chatbot" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "À propos", href: "/a-propos" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-3.5 w-3.5 text-paper/40 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M17 17l-3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const NavList = (
    <nav className="flex flex-col gap-1 px-4 py-4">
      {nav.map((item) =>
        item.children ? (
          <div key={item.label}>
            <button
              onClick={() =>
                setExpanded(expanded === item.label ? null : item.label)
              }
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm text-paper/80 transition hover:bg-paper/5 hover:text-paper"
              aria-expanded={expanded === item.label}
            >
              {item.label}
              <Chevron open={expanded === item.label} />
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-200 ${
                expanded === item.label
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-7 py-2 text-sm text-paper/60 transition hover:text-signal"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="rounded-md px-3 py-2.5 text-sm text-paper/80 transition hover:bg-paper/5 hover:text-paper"
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );

  return (
    <>
      {/* Barre fixe mobile : hamburger | logo centré | recherche */}
      <div className="fixed inset-x-0 top-0 z-50 grid h-16 grid-cols-[1fr_auto_1fr] items-center border-b border-paper/10 bg-surface px-4 md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-self-start rounded-md border border-paper/20 text-paper"
          aria-label="Ouvrir le menu"
        >
          <div className="mx-auto flex flex-col gap-1">
            <span className="h-px w-4 bg-paper" />
            <span className="h-px w-4 bg-paper" />
            <span className="h-px w-4 bg-paper" />
          </div>
        </button>

        <Link href="/" className="justify-self-center text-base font-semibold tracking-tight">
          Telop<span className="text-signal">ex</span>
        </Link>

        <button
          className="flex h-9 w-9 items-center justify-center justify-self-end rounded-md border border-paper/20 text-paper"
          aria-label="Rechercher"
        >
          <SearchIcon />
        </button>
      </div>

      {/* Overlay mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-ink/60 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Panneau mobile */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 overflow-y-auto bg-surface transition-transform duration-200 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-paper/10 px-4">
          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-paper/20 text-paper"
            aria-label="Fermer le menu"
          >
            ✕
          </button>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-base font-semibold tracking-tight"
          >
            Telop<span className="text-signal">ex</span>
          </Link>
        </div>
        {NavList}
      </aside>

      {/* Sidebar desktop */}
      <aside className="fixed left-0 top-0 z-30 hidden h-full w-64 border-r border-paper/10 bg-surface md:block">
        <div className="flex h-16 items-center justify-between border-b border-paper/10 px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Telop<span className="text-signal">ex</span>
          </Link>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md text-paper/60 transition hover:bg-paper/5 hover:text-paper"
            aria-label="Rechercher"
          >
            <SearchIcon />
          </button>
        </div>
        {NavList}
      </aside>
    </>
  );
}
