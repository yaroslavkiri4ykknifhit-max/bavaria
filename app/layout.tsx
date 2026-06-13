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
        
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <div className="font-bold text-gray-900 text-base md:text-lg tracking-tight uppercase">
                Bavaria<span className="text-gray-400 font-normal ml-1">Performance</span>
              </div>
            </div>
            <a 
              href="tel:+375291234567" 
              className="flex items-center gap-2 text-gray-900 font-semibold text-sm md:text-base hover:text-blue-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +375 (29) 123-45-67
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
