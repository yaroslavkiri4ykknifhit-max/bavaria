import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const siteUrl = "https://bavaria-performance.example.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#111",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BAVARIA PERFORMANCE | Чип-Тюнинг BMW в Минске",
    template: "%s | Bavaria Performance",
  },
  description: "Профессиональный чип-тюнинг BMW в Минске. Увеличение мощности Stage 1/2, отключение экологии (EGR/DPF/AdBlue). Дилерское оборудование ICOM, гарантия результата.",
  keywords: ["чип-тюнинг BMW", "прошивка BMW", "стейдж 1 BMW", "отключение экологии BMW", "Bavaria Performance", "Минск"],
  authors: [{ name: "Bavaria Performance" }],
  creator: "Bavaria Performance",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Bavaria Performance",
    title: "BAVARIA PERFORMANCE | Чип-Тюнинг BMW в Минске",
    description: "Профессиональный чип-тюнинг BMW в Минске. Увеличение мощности Stage 1/2, отключение экологии.",
    images: [
      {
        url: "/bg/main_bg.jpg",
        width: 1920,
        height: 1080,
        alt: "Bavaria Performance - Чип-Тюнинг BMW",
      },
    ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Bavaria Performance",
    description: "Профессиональный чип-тюнинг BMW в Минске",
    url: siteUrl,
    telephone: "+375291234567",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Минск",
      addressCountry: "BY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.9,
      longitude: 27.5667,
    },
    priceRange: "$$",
    openingHours: "Mo-Sa 09:00-19:00",
    sameAs: [],
  };

  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-[#fafafa] text-[#111]`}>
        
        <header className="bg-black sticky top-0 z-50">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-12 md:h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="3" fill="#e11d48"/>
                <path d="M6 17V7l8 5-8 5z" fill="#fff"/>
                <path d="M14 7h5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="font-bold text-white text-sm tracking-wide">BAVARIA</span>
            </Link>
            <a 
              href="tel:+375291234567" 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-xs md:text-sm font-medium"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span className="hidden sm:inline">+375 (29) 123-45-67</span>
              <span className="sm:hidden">Звонок</span>
            </a>
          </div>
        </header>
        
        <div className="flex-1 w-full relative pb-20 md:pb-0">
          {children}
        </div>

        <div className="md:hidden mobile-cta-bar">
          <a
            href="tel:+375291234567"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#e11d48] hover:bg-[#be123c] text-white rounded font-semibold text-sm transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            Позвонить нам
          </a>
        </div>
      </body>
    </html>
  );
}
