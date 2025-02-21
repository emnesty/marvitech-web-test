import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginPage from "@/components/login-form";

export default async function Page() {
  const session = await getServerSession();

  // Se já estiver logado, redireciona para o dashboard
  if (session) {
    redirect("/dashboard");
  }

  // Caso não esteja logado, renderiza a página de login
  return <LoginPage />;
}