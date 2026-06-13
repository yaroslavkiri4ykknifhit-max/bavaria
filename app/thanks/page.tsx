import Link from "next/link";

export default function ThanksPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="bg-white border border-gray-200 rounded-lg p-8 md:p-10 max-w-sm w-full text-center">
        <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Заявка принята
        </h1>
        
        <p className="text-gray-500 text-sm mb-6">
          Перезвоним в течение 10 минут
        </p>

        <Link 
          href="/"
          className="block w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded transition-colors"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
