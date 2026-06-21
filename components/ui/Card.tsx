import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-paper/10 p-6 transition hover:border-paper/20 ${className}`}
    >
      {children}
    </div>
  );
}
