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
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-white text-gray-900 relative`}>
        
        <header className="relative z-50 border-b-2 border-black bg-white">
          <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
            <div className="text-black font-bold text-xl md:text-2xl uppercase tracking-widest">
              BAVARIA PERFORMANCE
            </div>
            <a 
              href="tel:+375291234567" 
              className="text-black font-medium text-lg md:text-xl hover:text-blue-600 transition-colors"
            >
              +375 (29) 123-45-67
            </a>
          </div>
        </header>
        
        <div className="flex-1 relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
