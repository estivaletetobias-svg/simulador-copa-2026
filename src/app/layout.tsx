import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://simulador-copa-2026.vercel.app'),
  title: 'Simulador Copa do Mundo 2026',
  description: 'Faça suas previsões, simule resultados e descubra quem vai ser o Campeão da Copa de 2026!',
  openGraph: {
    title: 'Simulador Copa do Mundo 2026',
    description: 'Faça suas previsões, simule resultados e descubra quem vai ser o Campeão da Copa de 2026!',
    type: 'website',
  }
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
