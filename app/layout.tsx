import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "BAVARIA PERFORMANCE | Чип-Тюнинг BMW",
  description: "Специализированный сервис BMW в Минске. Профессиональный Чип-Тюнинг и Прошивка BMW.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
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
