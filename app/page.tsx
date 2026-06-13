import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CatalogPage() {
  const models = [
    { id: "e39", name: "BMW 5 Серия (E39)" },
    { id: "e46", name: "BMW 3 Серия (E46)" },
    { id: "e60", name: "BMW 5 Серия (E60)" },
    { id: "e90", name: "BMW 3 Серия (E90)" },
    { id: "f01", name: "BMW 7 Серия (F01)" },
    { id: "f10", name: "BMW 5 Серия (F10)" },
    { id: "f30", name: "BMW 3 Серия (F30)" },
    { id: "e70", name: "BMW X5 (E70)" },
    { id: "x5", name: "BMW X5 (F15/G05)" },
  ];

  const basePath = process.env.NODE_ENV === "production" ? "/bavaria" : "";

  return (
    <main className="min-h-screen py-8 md:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10 md:space-y-16">
      
      {/* Hero */}
      <section className="text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
        <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded uppercase tracking-wider">
          Каталог решений
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
          Чип-тюнинг BMW
        </h1>
        <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
          Выберите модель для расчета стоимости настройки блока управления и отключения экологии.
        </p>

        <div className="w-full mt-6 md:mt-10 overflow-hidden rounded-lg">
          <Image 
            src={`${basePath}/bg/main_bg.jpg`} 
            alt="BMW Tuning Garage" 
            width={1920}
            height={1080}
            className="w-full h-auto max-h-[35vh] md:max-h-[50vh] object-cover"
            priority
          />
        </div>
      </section>

      {/* Models */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Выберите модель</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {models.map((model) => (
            <Link 
              key={model.id} 
              href={`/${model.id}`}
              className="group flex items-center justify-between bg-white border border-gray-200 p-5 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all"
            >
              <span className="text-sm md:text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                {model.name}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 rounded-lg p-8 md:p-12 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Не нашли свою модель?</h3>
        <p className="text-gray-400 mb-6 text-sm md:text-base">Позвоните — подберем решение для любого BMW</p>
        <a 
          href="tel:+375291234567" 
          className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          +375 (29) 123-45-67
        </a>
      </section>
    </main>
  );
}
