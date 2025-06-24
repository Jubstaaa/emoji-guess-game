import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Emoji Guess Game",
    template: "%s | Emoji Guess Game",
  },
  description: "Guess movies, series, books and games from emojis!",
  keywords: ["emoji", "game", "guess", "movies", "series", "books", "games"],
  authors: [{ name: "Ilker Balcilar" }],
  openGraph: {
    title: "Emoji Guess Game",
    description: "Guess movies, series, books and games from emojis!",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Emoji Guess Game Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji Guess Game",
    description: "Guess movies, series, books and games from emojis!",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Emoji Guess Game Logo",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: 0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-3 sm:p-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Emoji Guess Game Logo"
                width={220}
                height={220}
                className="mx-auto w-40 sm:w-52 md:w-56 h-auto"
              />
            </Link>
            {children}
          </div>
        </main>
        <Toaster position="top-center" />
        <GoogleAnalytics gaId="G-BR1ZG31FEP" />
        {process.env.NODE_ENV === "production" && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2149079899242374`}
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
