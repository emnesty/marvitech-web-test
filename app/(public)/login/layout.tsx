import "../../../app/globals.css";
import { Inter } from "next/font/google";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });


export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      <body
        className={`${fontSans.variable} font-sans antialiased bg-gray-900 flex justify-center items-center text-gray-900 min-h-screen`}>

        {children}
      </body>
    </html>
  );
}
