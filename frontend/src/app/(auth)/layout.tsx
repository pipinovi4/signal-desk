import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

type AuthLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-background text-foreground relative flex min-h-dvh w-full items-center justify-center max-sm:px-6 max-sm:py-20">
      <ThemeToggle className="absolute top-4 right-4 max-sm:top-6 max-sm:right-6" />
      <div className="mx-auto w-full max-w-122">{children}</div>
    </main>
  );
}
