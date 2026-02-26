import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AV Toolbox | Production Calculator Suite",
  description:
    "Free professional AV & streaming production tools. Bitrate calculator, stream delay, RTMP builder, lower thirds, and more.",
  keywords: [
    "bitrate calculator",
    "stream delay calculator",
    "RTMP URL builder",
    "lower third generator",
    "aspect ratio calculator",
    "AV production tools",
    "live streaming tools",
    "OBS bitrate",
    "vMix tools",
  ],
  openGraph: {
    title: "AV Toolbox | Production Calculator Suite",
    description:
      "Free professional AV & streaming production tools for live streaming and broadcast.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased noise-bg`}
      >
        {children}
      </body>
    </html>
  );
}
