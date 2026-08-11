import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { siteConfig } from "@/data/site";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CursorGlow } from "@/components/layout/CursorGlow";
import { InteractiveCursor } from "@/components/layout/InteractiveCursor";
import { ScrollProgressBar } from "@/components/layout/ScrollProgressBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [
    "Unity Developer",
    "Game Developer Portfolio",
    "Unity 3D",
    "C# Developer",
    "Mobile Game Development",
    "Multiplayer Game Developer",
    "AR VR Developer",
    siteConfig.name,
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body
        className="min-h-full cursor-default bg-bg text-white selection:bg-purple/40"
        suppressHydrationWarning
      >
        <LoadingScreen />
        <ScrollProgressBar />
        <CursorGlow />
        <InteractiveCursor />
        <Navbar />
        <SmoothScrollProvider>
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
