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
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-neutral-950 text-zinc-300 relative shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]`}>
        
        <header className="relative z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl shadow-[0_15px_60px_-15px_rgba(255,255,255,0.05)]">
          <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
            <div className="text-white font-bold text-xl md:text-2xl uppercase tracking-wider">
              BAVARIA PERFORMANCE
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline-block text-sm text-neutral-500 font-mono">
                Независимое объединение BMW инженеров Минска
              </span>
              <a 
                href="tel:+375291234567" 
                className="text-white font-medium text-lg md:text-xl hover:text-blue-500 transition-colors"
              >
                +375 (29) 123-45-67
              </a>
            </div>
          </div>
        </header>
        
        <div className="flex-1 relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
