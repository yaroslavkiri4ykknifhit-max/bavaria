import Link from "next/link";

export default function ThanksPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-medium border border-slate-100 p-8 md:p-10 max-w-sm w-full text-center animate-scale-in">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg animate-float">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        
        <h1 className="text-xl font-bold text-slate-900 mb-2">
          Заявка принята!
        </h1>
        
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Наш инженер свяжется с вами<br/>в течение 10 минут
        </p>

        <Link 
          href="/"
          className="block w-full py-3 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
