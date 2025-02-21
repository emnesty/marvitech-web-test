import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { cookies } from "next/headers";

const handler = NextAuth({
  pages: {
    signIn: "/"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        console.log("authorize() -> Recebendo credenciais:", credentials);
        if (!credentials) {
          console.log("authorize() -> Nenhuma credencial fornecida, retornando null.");
          return null;
        }

        try {
          console.log("authorize() -> Enviando requisição para /api/login com:", {
            email: credentials.email,
            password: credentials.password
          });

          const response = await fetch("http://147.93.146.163:8082/api/login", {
            method: "POST",
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            }),
            headers: { "content-type": "application/json" }
          });

          console.log("authorize() -> Resposta da API, status:", response.status);

          if (response.status !== 200) {
            console.log("authorize() -> Resposta não é 200, retornando null.");
            return null;
          }

          // A API retorna diretamente o token JWT (uma string)
          const tokenFromAPI = await response.text();
          console.log("authorize() -> Token recebido:", tokenFromAPI);

          if (!tokenFromAPI) {
            console.log("authorize() -> Token vazio, retornando null.");
            return null;
          }

          // Armazena o token no cookie para uso posterior
          console.log("authorize() -> Definindo cookie com JWT:", tokenFromAPI);
          (await cookies()).set("jwt", tokenFromAPI);

          console.log("authorize() -> Autenticação bem-sucedida, retornando objeto do usuário.");
          // Como a API não retorna dados do usuário, você pode montar um objeto com dados mínimos
          return {
            id: "default-id", // Caso necessário, você pode decodificar o token para extrair o id
            email: credentials.email,
            name: credentials.email,
            jwt: tokenFromAPI
          };
        } catch (error) {
          console.error("authorize() -> Erro na autenticação:", error);
          return null;
        }
      }
    })
  ]
});

export { handler as GET, handler as POST };
