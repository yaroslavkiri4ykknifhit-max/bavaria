import Link from "next/link";
import { Check } from "lucide-react";

export default function ThanksPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white border border-gray-200 rounded-lg p-10 md:p-14 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600" strokeWidth={2.5} />
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Заявка принята
        </h1>
        
        <p className="text-gray-500 text-base mb-8">
          Номер передан инженеру. Перезвоним в течение 10 минут.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center justify-center w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm rounded-lg transition-colors"
        >
          Вернуться на главную
        </Link>
      </div>
    </main>
  );
}
