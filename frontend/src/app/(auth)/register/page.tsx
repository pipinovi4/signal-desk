import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/auth-card";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Create account | SignalDesk",
  description: "Create your SignalDesk account.",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create your SignalDesk account"
      subtitle="Bring important updates into one place."
    >
      <RegisterForm />
    </AuthCard>
  );
}
