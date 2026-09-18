import { ReactNode } from "react";

type LegalLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <main className="bg-background text-foreground min-h-dvh px-0 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </main>
  );
}
