import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'AV Toolbox | Free Production Tools for Streaming & Broadcast',
    template: '%s | AV Toolbox',
  },
  description: 'Free production-grade calculators and utilities for live streaming, broadcast, and AV professionals. Bitrate calculator, stream delay, safe areas, and more.',
  keywords: ['AV tools', 'streaming calculator', 'broadcast tools', 'bitrate calculator', 'stream delay', 'live production', 'audio video'],
  openGraph: {
    title: 'AV Toolbox | Free Production Tools for Streaming & Broadcast',
    description: 'Free production-grade calculators and utilities for live streaming, broadcast, and AV professionals.',
    type: 'website',
    siteName: 'AV Toolbox',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AV Toolbox | Free Production Tools',
    description: 'Free production-grade calculators and utilities for AV professionals.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} dark`} suppressHydrationWarning>
      <body className="antialiased bg-[#141414] text-[#e8e4df] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
