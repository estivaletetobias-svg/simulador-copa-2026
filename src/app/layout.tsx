import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Simulador Copa do Mundo 2026',
  description: 'Faça suas previsões, simule resultados e descubra quem vai ser o Campeão da Copa de 2026!',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  appleWebApp: {
    title: 'Simulador 2026',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Simulador Copa do Mundo 2026',
    description: 'Faça suas previsões, simule resultados e descubra quem vai ser o Campeão da Copa de 2026!',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulador Copa do Mundo 2026',
    description: 'Faça suas previsões, simule resultados e descubra quem vai ser o Campeão da Copa de 2026!',
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
