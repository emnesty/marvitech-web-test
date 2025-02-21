// /app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession();

  if (session) {
    // Usuário autenticado: redireciona para o dashboard
    redirect("/dashboard");
  } else {
    // Usuário não autenticado: redireciona para a página de login
    redirect("/login");
  }

  return null; 
}
