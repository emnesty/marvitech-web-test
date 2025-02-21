

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="pt-BR">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <body>{children}</body>
      </html>
    );
  }
  