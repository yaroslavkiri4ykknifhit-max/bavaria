import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

const siteUrl = "https://bavaria-performance.example.com";

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
      </head>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-gray-50 text-gray-900`}>
        
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2.5">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="4" fill="#111"/>
                <path d="M7 20V8l7 6-7 6z" fill="#fff"/>
                <path d="M15 8h6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="font-semibold text-gray-900 text-sm tracking-tight">BAVARIA</span>
            </a>
            <a 
              href="tel:+375291234567" 
              className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span className="font-medium">+375 (29) 123-45-67</span>
            </a>
          </div>
        </header>
        
        <div className="flex-1 w-full relative">
          {children}
        </div>
      </body>
    </html>
  );
}
