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
  title: {
    default: "AV Toolbox | Free Production Tools for Streaming & Broadcast",
    template: "%s | AV Toolbox",
  },
  description:
    "Free production-grade calculators and utilities for live streaming, broadcast, and AV professionals. Bitrate calculator, stream delay, RTMP builder, lower thirds, and more.",
  keywords: [
    "AV tools",
    "streaming tools",
    "bitrate calculator",
    "stream delay calculator",
    "RTMP URL builder",
    "lower third generator",
    "aspect ratio calculator",
    "AV production tools",
    "live streaming tools",
    "broadcast tools",
    "OBS tools",
    "vMix tools",
  ],
  openGraph: {
    title: "AV Toolbox | Free Production Tools for Streaming & Broadcast",
    description:
      "Free production-grade calculators and utilities for live streaming, broadcast, and AV professionals.",
    type: "website",
    siteName: "AV Toolbox",
  },
  twitter: {
    card: "summary_large_image",
    title: "AV Toolbox | Free Production Tools for Streaming & Broadcast",
    description:
      "Free production-grade calculators and utilities for live streaming, broadcast, and AV professionals.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
