import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
}

const styles: Record<Variant, string> = {
  primary: "bg-signal text-ink hover:opacity-90",
  secondary: "border border-paper/30 text-paper hover:border-paper/60",
};

export default function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = `rounded-md px-6 py-3 text-sm font-medium transition ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}
