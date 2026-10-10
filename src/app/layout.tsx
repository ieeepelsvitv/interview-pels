import type { Metadata } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-super' });
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-editorial' });

export const metadata: Metadata = {
  title: 'IEEE PELS VIT Vellore — Junior Core Recruitment 2026',
  description: 'Virtual Recruitment Portal for IEEE Power Electronics Society VIT Vellore.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="selection:bg-[#d4c7ff] selection:text-[#292827]">{children}</body>
    </html>
  );
}