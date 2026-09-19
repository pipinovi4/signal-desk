import type { ReactNode } from "react";

type LandingSectionProps = Readonly<{
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  id?: string;
  intro?: string;
  title?: string;
}>;

export function LandingSection({
  children,
  className,
  eyebrow,
  id,
  intro,
  title,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      className={[
        "border-border border-t px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || intro) && (
          <div className="mb-12 max-w-3xl sm:mb-16">
            {eyebrow && (
              <p className="text-primary mb-4 text-xs font-semibold tracking-[0.2em] uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-7 sm:text-lg">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
