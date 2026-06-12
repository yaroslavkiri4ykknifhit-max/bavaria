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
        
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">
            <div className="text-gray-900 font-bold text-xl md:text-2xl tracking-wide uppercase">
              Bavaria Performance
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline-block text-sm text-gray-500">
                Независимое объединение BMW инженеров
              </span>
              <a 
                href="tel:+375291234567" 
                className="text-gray-900 font-semibold text-lg md:text-xl hover:text-blue-600 transition-colors"
              >
                +375 (29) 123-45-67
              </a>
            </div>
          </div>
        </header>
        
        <div className="flex-1 w-full relative">
          {children}
        </div>
      </body>
    </html>
  );
}
