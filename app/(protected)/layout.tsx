import { Inter } from "next/font/google";
import "../../app/globals.css";
import { Providers } from "@/components/providers";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans antialiased dark`}>
        <Providers>
            <SidebarProvider>
                <div className="flex">
                  <AppSidebar />
                  <SidebarInset className="flex-1 overflow-hidden px-4 md:px-6 lg:px-8">
                    {children}
                  </SidebarInset>
                </div>
            </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}