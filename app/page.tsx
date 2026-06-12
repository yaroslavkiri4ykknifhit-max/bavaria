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
    <main className="min-h-screen py-10 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 md:space-y-20">
      
      {/* Hero Section */}
      <section className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs md:text-sm font-semibold rounded-full uppercase tracking-wide">
          Каталог решений
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Профессиональный <br className="hidden md:block"/> чип-тюнинг BMW
        </h1>
        <p className="text-base md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Выберите вашу модель для расчета стоимости индивидуальной настройки блока управления (DME/DDE) и программного отключения экологии.
        </p>

        <div className="w-full mt-8 md:mt-12 overflow-hidden rounded-xl shadow-md border border-gray-200">
          <Image 
            src={`${basePath}/bg/main_bg.jpg`} 
            alt="BMW Tuning Garage" 
            width={1920}
            height={1080}
            className="w-full h-auto max-h-[40vh] md:max-h-[60vh] object-cover"
            priority
          />
        </div>
      </section>

      {/* Grid Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <Link 
            key={model.id} 
            href={`/${model.id}`}
            className="group flex items-center justify-between bg-white border border-gray-200 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md hover:border-blue-500 transition-all"
          >
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {model.name}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
