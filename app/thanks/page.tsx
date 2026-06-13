import Link from "next/link";
import { Check } from "lucide-react";

export default function ThanksPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
      
      <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 p-10 md:p-16 max-w-xl w-full text-center shadow-2xl shadow-gray-200/50 rounded-3xl animate-in fade-in zoom-in duration-700">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-50 animate-pulse-slow" />
            <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 p-5 rounded-2xl shadow-lg shadow-green-500/30">
              <Check className="w-16 h-16 text-white" strokeWidth={3} />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
          <span className="gradient-text">ЗАЯВКА</span>
          <br />
          ПРИНЯТА
        </h1>
        
        <p className="text-gray-600 text-lg md:text-xl mb-8 font-medium">
          Ваш номер передан инженеру. Мы свяжемся с вами в течение 10 минут.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Среднее время ответа: 3 минуты</span>
        </div>

        <Link 
          href="/"
          className="group inline-flex min-h-[60px] items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg tracking-widest uppercase transition-all duration-300 rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02]"
        >
          Вернуться на главную
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
