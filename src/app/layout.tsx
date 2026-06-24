import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Simulador Copa do Mundo 2026',
  description: 'Simule os resultados da Copa do Mundo 2026',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
