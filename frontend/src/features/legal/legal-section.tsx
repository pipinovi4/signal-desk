import { ReactNode } from "react";

type LegalSectionProps = Readonly<{
  children: ReactNode;
  id: string;
  title: string;
}>;

export function LegalSection({ children, id, title }: LegalSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-8 space-y-4 border-t border-border pt-8 first:border-t-0 first:pt-0"
    >
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
        {children}
      </div>
    </section>
  );
}
