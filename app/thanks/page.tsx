import Link from "next/link";
import { Check } from "lucide-react";

export default function ThanksPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white border-2 border-black p-10 md:p-16 max-w-xl w-full text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-8">
          <div className="bg-black p-5 border-2 border-black">
            <Check className="w-16 h-16 text-white" strokeWidth={3} />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-black mb-6 uppercase tracking-tight">
          ЗАЯВКА ПРИНЯТА
        </h1>
        
        <p className="text-gray-700 text-xl mb-12 font-medium">
          Ваш номер передан инженеру. Мы свяжемся с вами в течение 10 минут.
        </p>

        <Link 
          href="/"
          className="inline-flex min-h-[60px] items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg tracking-widest uppercase transition-all border-2 border-blue-600"
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}
