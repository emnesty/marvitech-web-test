// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    jwt?: string;
    // Adicione outros campos personalizados aqui se necessário
  }
  
  interface User {
    // Se estiver usando JWT strategy, adicione também ao User
    jwt?: string;
  }
}