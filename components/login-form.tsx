"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = await signIn("credentials", {
      redirect: false,
      ...data,
      callbackUrl: "/dashboard",
    });

    if (result?.error) {
      setErrorMessage(
        "Usuário ou senha inválidos. Por favor, verifique seus dados e tente novamente."
      );
    } else if (result?.url) {
      window.location.href = result.url;
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-20 w-auto"
          src="/logo.png"
          alt="Marvitech Logo"
          width={120}
          height={120}
          priority
        />
        <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-white">
          Entre com a sua conta
        </h2>

      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {errorMessage && (
          <div className="my-2">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          </div>
        )}
        <form onSubmit={login} action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm leading-6 font-medium text-white"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:outline-cyan-500 sm:text-sm leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm leading-6 font-medium text-white"
              >
                Senha
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:outline-cyan-500 sm:text-sm leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-cyan-500 px-3 py-1.5 text-sm leading-6 font-semibold text-white shadow-sm hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
