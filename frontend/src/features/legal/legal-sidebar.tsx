type LegalNavigationItem = Readonly<{
  href: string;
  label: string;
}>;

type LegalSidebarProps = Readonly<{
  items: readonly LegalNavigationItem[];
}>;

export function LegalSidebar({ items }: LegalSidebarProps) {
  return (
    <aside className="hidden lg:block" aria-label="On this page">
      <nav className="sticky top-8">
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-foreground uppercase">
          On this page
        </p>
        <ul className="space-y-3 border-l border-border pl-4">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm leading-5 text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
