export default function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-surface px-6 py-8 text-sm text-paper/50">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Telopex</p>
        <div className="flex gap-6">
          <a href="mailto:contact@telopex.online" className="transition hover:text-paper">
            contact@telopex.online
          </a>
          <a href="https://github.com/TELOPEX2026" className="transition hover:text-paper">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
