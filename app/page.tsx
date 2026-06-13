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
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded mb-5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                Профессиональный чип-тюнинг
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight tracking-tight mb-4">
                Настройка BMW<br/>
                <span className="text-blue-600">с гарантией результата</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-6 max-w-md">
                Увеличение мощности, отключение экологии. Работаем с блоками управления DME/DDE через дилерское оборудование.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                  Без ошибок на панели
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                  14 дней на проверку
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                  Оборудование ICOM
                </span>
              </div>
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-100">
                <div>
                  <div className="text-2xl font-bold text-gray-900">7+</div>
                  <div className="text-xs text-gray-400">лет опыта</div>
                </div>
                <div className="w-px h-8 bg-gray-100"/>
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-xs text-gray-400">прошитых авто</div>
                </div>
                <div className="w-px h-8 bg-gray-100"/>
                <div>
                  <div className="text-2xl font-bold text-gray-900">4.9</div>
                  <div className="text-xs text-gray-400">средняя оценка</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src={`${basePath}/bg/main_bg.jpg`} 
                  alt="BMW Tuning Garage" 
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 -left-3 bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium">
                500+ прошитых авто
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Выберите модель</h2>
            <p className="text-sm text-gray-400">Нажмите для расчета стоимости</p>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {models.map((model) => (
            <Link 
              key={model.id} 
              href={`/${model.id}`}
              className="group flex items-center justify-between bg-white border border-gray-200 px-5 py-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-50 border border-gray-100 rounded flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  {model.name}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                num: "01",
                title: "Оставляете заявку", 
                desc: "Выбираете модель и указываете телефон",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                )
              },
              { 
                num: "02",
                title: "Консультация", 
                desc: "Инженер связывается и обсуждает задачу",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                )
              },
              { 
                num: "03",
                title: "Прошивка", 
                desc: "Настраиваем ПО и проверяем результат",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                )
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  {step.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-300 font-medium mb-1">{step.num}</div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Наши гарантии</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "14 дней на возврат", desc: "Если результат не устроит — вернем деньги", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 14l-4-4m0 0l4-4m-4 4h11a4 4 0 010 8h-1"/></svg> },
              { title: "Без ошибок", desc: "Проверяем сканером после прошивки", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
              { title: "Запись ПО", desc: "Сохраним вашу заводскую прошивку", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg> },
              { title: "Честная оценка", desc: "Скажем, если прошивка не даст эффект", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg> },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-0.5">{item.title}</h3>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Отзывы клиентов</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Алексей",
              car: "BMW F10 535i",
              text: "После Stage 1 машина просто otraя. Разница ощутима сразу — и на низах, и на верхах. Убрал DPF, ошибок нет. Рекомендую.",
              rating: 5,
              date: "Май 2025"
            },
            {
              name: "Дмитрий",
              car: "BMW E90 330d",
              text: "Приехал с чиповкой от другого мастера — машинатроила. Здесь всё сделали заново, проанализировали. Теперь едет как надо.",
              rating: 5,
              date: "Апрель 2025"
            },
            {
              name: "Сергей",
              car: "BMW X5 F15 30d",
              text: "Убрал сажевик и мочевину. Всё чисто, без ошибок. Инженер всё объяснил, показал результаты до/после. Профессионалы.",
              rating: 5, 
              date: "Март 2025"
            }
          ].map((review, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-500">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{review.name}</div>
                    <div className="text-xs text-gray-400">{review.car}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-300">{review.date}</div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[...Array(review.rating)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="bg-gray-900 rounded-lg px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Не нашли свою модель?</h3>
            <p className="text-gray-400 text-sm">Позвоните — подберем решение для любого BMW</p>
          </div>
          <a 
            href="tel:+375291234567" 
            className="flex items-center gap-2 bg-white text-gray-900 font-medium px-6 py-3 rounded text-sm hover:bg-gray-100 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            +375 (29) 123-45-67
          </a>
        </div>
      </section>
    </main>
  );
}
