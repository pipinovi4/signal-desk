import type { ReactNode } from "react";

type AuthLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-background text-foreground flex min-h-dvh w-full items-center justify-center px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[488px]">{children}</div>
    </main>
  );
}
