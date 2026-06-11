import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CatalogPage() {
  const models = [
    { id: "e39", name: "BMW 5 СЕРИЯ (E39)" },
    { id: "e46", name: "BMW 3 СЕРИЯ (E46)" },
    { id: "e60", name: "BMW 5 СЕРИЯ (E60)" },
    { id: "e90", name: "BMW 3 СЕРИЯ (E90)" },
    { id: "f01", name: "BMW 7 СЕРИЯ (F01)" },
    { id: "f10", name: "BMW 5 СЕРИЯ (F10)" },
    { id: "f30", name: "BMW 3 СЕРИЯ (F30)" },
    { id: "e70", name: "BMW X5 (E70)" },
    { id: "x5", name: "BMW X5 (F15/G05)" },
  ];

  const basePath = process.env.NODE_ENV === "production" ? "/bavaria" : "";

  return (
    <main className="min-h-screen py-8 md:py-24 px-4 md:px-6 max-w-7xl mx-auto space-y-10 md:space-y-16">
      
      <section className="text-center space-y-6 md:space-y-8 max-w-5xl mx-auto">
        <div className="inline-block border border-blue-500/30 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-sm font-bold tracking-widest uppercase text-blue-400 bg-blue-500/10 backdrop-blur-sm shadow-[0_0_20px_rgba(37,99,235,0.2)]">
          КАТАЛОГ ПРОШИВОК
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase tracking-wide">
          Выберите Вашу Модель BMW
        </h1>
        <p className="text-base md:text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto font-medium">
          Профессиональный чип-тюнинг и индивидуальная настройка блоков управления (DME/DDE) для всего модельного ряда.
        </p>

        <div className="w-full mt-6 md:mt-10 overflow-hidden border border-white/10 bg-zinc-900/60 shadow-[0_15px_60px_-15px_rgba(255,255,255,0.05)] rounded-sm">
          <img 
            src={`${basePath}/bg/main_bg.jpg`} 
            alt="BMW Tuning Garage" 
            width="1920"
            height="1080"
            className="w-full h-auto max-h-[40vh] md:max-h-[60vh] object-cover opacity-80"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8">
        {models.map((model) => (
          <Link 
            key={model.id} 
            href={`/${model.id}`}
            className="group block bg-zinc-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_15px_60px_-15px_rgba(255,255,255,0.05)] p-6 md:p-8 transition-all duration-300 hover:border-blue-500/50 hover:bg-zinc-800/80 hover:-translate-y-1 relative overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between relative z-10">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white uppercase">
                  {model.name}
                </h2>
              </div>
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-600 transition-all duration-300">
                <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
