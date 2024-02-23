import Footer from '@/components/footer';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

import '../index.css';
import {Theme} from '@radix-ui/themes';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: `Titolo`,
  description: `Descrizione`,
  metadataBase: new URL(process.env.DOMAIN || 'http://localhost:3000'),
  openGraph: {
    images: '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <div className="min-h-screen">{children}</div>
        </Theme>
        <Footer />
      </body>
    </html>
  );
}
