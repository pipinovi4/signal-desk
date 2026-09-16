import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Sign in | SignalDesk",
  description: "Sign in to your SignalDesk account.",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to SignalDesk."
    >
      <LoginForm />
    </AuthCard>
  );
}
