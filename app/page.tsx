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
      <section className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10 animate-pulse-slow" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 text-blue-700 text-xs md:text-sm font-semibold rounded-full backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Каталог решений
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
          <span className="text-gray-900">Профессиональный </span>
          <br className="hidden md:block"/>
          <span className="gradient-text">чип-тюнинг BMW</span>
        </h1>
        
        <p className="text-base md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Выберите вашу модель для расчета стоимости индивидуальной настройки блока управления (DME/DDE) и программного отключения экологии.
        </p>

        <div className="w-full mt-8 md:mt-12 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/20">
            <Image 
              src={`${basePath}/bg/main_bg.jpg`} 
              alt="BMW Tuning Garage" 
              width={1920}
              height={1080}
              className="w-full h-auto max-h-[40vh] md:max-h-[60vh] object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { number: "500+", label: "Прошитых авто" },
          { number: "98%", label: "Довольных клиентов" },
          { number: "7", label: "Лет опыта" },
          { number: "24/7", label: "Поддержка" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-xl p-4 md:p-6 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="text-2xl md:text-3xl font-black gradient-text">{stat.number}</div>
            <div className="text-xs md:text-sm text-gray-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Grid Section */}
      <section>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Выберите модель</h2>
          <p className="text-gray-500">Нажмите на карточку для расчета стоимости</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {models.map((model, i) => (
            <Link 
              key={model.id} 
              href={`/${model.id}`}
              className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 card-glow overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {model.name}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Рассчитать стоимость →
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-purple-600 group-hover:border-0 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-45">
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-8 md:p-12 text-center text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhoMTJ2MnpNMzYgMjZ2Mkg4di0yaDI4em0wLTRWMjJoMTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        <div className="relative z-10">
          <h3 className="text-2xl md:text-4xl font-black mb-4">Готовы увеличить мощность?</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Оставьте заявку и получите бесплатную консультацию по вашему BMW
          </p>
          <a 
            href="tel:+375291234567" 
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Позвонить нам
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  );
}
