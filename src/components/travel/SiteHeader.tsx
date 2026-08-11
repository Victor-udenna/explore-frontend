interface SiteHeaderProps {
  className?: string;
  variant?: "dark" | "light";
}

export function SiteHeader({ className = "", variant = "dark" }: Readonly<SiteHeaderProps>) {
  const logoSpan = variant === "light" ? "text-white" : "text-foreground";

  return (
    <header className={`flex items-center justify-between px-6 py-6 sm:px-10 ${className}`}>
      <a href="/" className={`text-xl font-extrabold tracking-tight text-primary ${logoSpan}`}>
        <span className={logoSpan}>Xploredestination</span>
      </a>
    </header>
  );
}
