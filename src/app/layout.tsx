import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import LenisProvider from "@/components/ui/LenisProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Narciso III Javier | Portfolio",
  description: "Portfolio of Narciso III Javier, a Computer Science student building practical systems, backend services, tooling, and game prototypes.",
  keywords: ["Narciso Javier", "Portfolio", "Computer Science", "Software Developer", "Full Stack", "Docker", "AI", "Python", "Go", "Next.js"],
  authors: [{ name: "Narciso III Javier" }],
  creator: "Narciso III Javier",
  metadataBase: new URL("https://narcisojavier.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://narcisojavier.vercel.app",
    siteName: "Narciso III Javier Portfolio",
    title: "Narciso III Javier | Portfolio",
    description: "Practical systems, backend services, tooling, and game prototypes by Narciso III Javier.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Narciso III Javier - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Narciso III Javier | Portfolio",
    description: "Computer Science student specializing in scalable system architecture, containerization, and AI workflow automation.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className="min-h-full">
        {/* Accessible Skip Navigation Link (WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-[#091008] focus:font-mono focus:text-xs focus:font-bold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          Skip to Main Content
        </a>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
