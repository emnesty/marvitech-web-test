import { Inter } from "next/font/google";
import "../app/globals.css";
import { Providers } from "@/components/providers";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "MarviTech Web",
  description: "Descrição...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans antialiased bg-gray-900 flex justify-center items-center text-gray-900 min-h-screen`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
