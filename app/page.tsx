import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CatalogPage() {
  const models = [
    { id: "e39", name: "BMW E39", series: "5 СЕРИЯ" },
    { id: "e46", name: "BMW E46", series: "3 СЕРИЯ" },
    { id: "e60", name: "BMW E60", series: "5 СЕРИЯ" },
    { id: "e90", name: "BMW E90", series: "3 СЕРИЯ" },
    { id: "f01", name: "BMW F01", series: "7 СЕРИЯ" },
    { id: "f10", name: "BMW F10", series: "5 СЕРИЯ" },
    { id: "f30", name: "BMW F30", series: "3 СЕРИЯ" },
    { id: "e70", name: "BMW E70", series: "X5" },
    { id: "x5", name: "BMW X5", series: "F15/G05" },
  ];

  const basePath = process.env.NODE_ENV === "production" ? "/bavaria" : "";

  return (
    <main className="min-h-screen py-8 md:py-24 px-4 md:px-6 max-w-7xl mx-auto space-y-10 md:space-y-16">
      
      <section className="text-center space-y-6 md:space-y-8 max-w-5xl mx-auto">
        <div className="inline-block border-2 border-black px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-sm font-bold tracking-widest uppercase text-black">
          КАТАЛОГ ПРОШИВОК
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black leading-tight uppercase">
          Выберите Вашу Модель BMW
        </h1>
        <p className="text-base md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Профессиональный чип-тюнинг и индивидуальная настройка блоков управления (DME/DDE) для всего модельного ряда.
        </p>

        <div className="w-full mt-6 md:mt-10 overflow-hidden border-2 border-black bg-gray-100">
          <img 
            src={`${basePath}/bg/main_bg.jpg`} 
            alt="BMW Tuning Garage" 
            width="1920"
            height="1080"
            className="w-full h-auto max-h-[40vh] md:max-h-[60vh] object-cover"
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
            className="group block bg-white border-2 border-black p-6 md:p-8 transition-colors hover:bg-black hover:text-white relative"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-wide mb-1 uppercase">
                  {model.name}
                </h2>
                <p className="text-gray-500 font-medium group-hover:text-gray-300">
                  {model.series}
                </p>
              </div>
              <div className="w-10 h-10 border-2 border-black flex items-center justify-center group-hover:border-white transition-colors">
                <ArrowRight className="w-5 h-5 group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
