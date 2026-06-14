import Link from "next/link";
import Image from "next/image";

export default function CatalogPage() {
  const models = [
    { id: "e39", name: "BMW 5 Серия (E39)", gen: "1995–2003" },
    { id: "e46", name: "BMW 3 Серия (E46)", gen: "1998–2006" },
    { id: "e60", name: "BMW 5 Серия (E60)", gen: "2003–2010" },
    { id: "e90", name: "BMW 3 Серия (E90)", gen: "2005–2011" },
    { id: "f01", name: "BMW 7 Серия (F01)", gen: "2008–2015" },
    { id: "f10", name: "BMW 5 Серия (F10)", gen: "2010–2016" },
    { id: "f30", name: "BMW 3 Серия (F30)", gen: "2011–2019" },
    { id: "e70", name: "BMW X5 (E70)", gen: "2006–2013" },
    { id: "x5", name: "BMW X5 (F15/G05)", gen: "2013–н.в." },
  ];

  const basePath = process.env.NODE_ENV === "production" ? "/bavaria" : "";

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero noise-bg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-blue-200 text-xs font-semibold rounded-full mb-6 border border-white/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                Профессиональный чип-тюнинг
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[46px] font-bold text-white leading-[1.1] tracking-tight mb-5">
                Настройка BMW
                <br/>
                <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-200 bg-clip-text text-transparent">
                  с гарантией результата
                </span>
              </h1>
              <p className="text-blue-100/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                Увеличение мощности, отключение экологии. Работаем с блоками управления DME/DDE через дилерское оборудование.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {["Без ошибок на панели", "14 дней на проверку", "Оборудование ICOM"].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-blue-100/80">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6">
                {[
                  { value: "7+", label: "лет опыта" },
                  { value: "500+", label: "прошитых авто" },
                  { value: "4.9", label: "рейтинг" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-blue-200/50 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-slide-in-right hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src={`${basePath}/bg/main_bg.jpg`} 
                  alt="BMW Tuning Garage" 
                  width={960}
                  height={540}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 1024px) 0px, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-5 py-3 shadow-xl flex items-center gap-3 animate-float">
                <div className="w-10 h-10 gradient-brand rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">500+ авто</div>
                  <div className="text-xs text-slate-400">уже прошиты</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full mb-3">Каталог</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Выберите модель</h2>
          <p className="text-sm text-slate-400">Нажмите для расчета стоимости прошивки</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {models.map((model, i) => (
            <Link 
              key={model.id} 
              href={`/${model.id}`}
              className={`group relative bg-white rounded-xl px-5 py-4 hover-lift shadow-soft border border-slate-100 overflow-hidden animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" className="group-hover:stroke-blue-500 transition-colors">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors block">
                      {model.name}
                    </span>
                    <span className="text-xs text-slate-300">{model.gen}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-500 group-hover:scale-110 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" className="group-hover:stroke-white transition-colors">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-600 text-xs font-semibold rounded-full mb-3">Процесс</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Как это работает</h2>
            <p className="text-sm text-slate-400">Три простых шага до результата</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                num: "01",
                title: "Оставляете заявку", 
                desc: "Выбираете модель и указываете телефон",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                )
              },
              { 
                num: "02",
                title: "Консультация", 
                desc: "Инженер связывается и обсуждает задачу",
                color: "from-violet-500 to-purple-600",
                bgColor: "bg-violet-50",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                )
              },
              { 
                num: "03",
                title: "Прошивка", 
                desc: "Настраиваем ПО и проверяем результат",
                color: "from-emerald-500 to-green-600",
                bgColor: "bg-emerald-50",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                )
              },
            ].map((step, i) => (
              <div key={step.num} className={`relative bg-white rounded-2xl p-6 shadow-soft border border-slate-100 hover-lift animate-fade-in-up delay-${(i+1) * 100}`}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {step.icon}
                </div>
                <div className="text-xs text-slate-300 font-bold mb-1 tracking-wider">{step.num}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full mb-3">Гарантии</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Наши гарантии</h2>
          <p className="text-sm text-slate-400">Ваша безопасность — наш приоритет</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "14 дней на возврат", desc: "Если результат не устроит — вернем деньги", color: "from-rose-500 to-pink-600", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 14l-4-4m0 0l4-4m-4 4h11a4 4 0 010 8h-1"/></svg> },
            { title: "Без ошибок", desc: "Проверяем сканером после прошивки", color: "from-emerald-500 to-green-600", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
            { title: "Запись ПО", desc: "Сохраним вашу заводскую прошивку", color: "from-blue-500 to-indigo-600", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg> },
            { title: "Честная оценка", desc: "Скажем, если прошивка не даст эффект", color: "from-amber-500 to-orange-600", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg> },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100 hover-lift group animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-600 text-xs font-semibold rounded-full mb-3">Отзывы</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Что говорят клиенты</h2>
            <p className="text-sm text-slate-400">Реальные отзывы владельцев BMW</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: "Алексей",
                car: "BMW F10 535i",
                text: "После Stage 1 машина просто otraя. Разница ощутима сразу — и на низах, и на верхах. Убрал DPF, ошибок нет. Рекомендую.",
                rating: 5,
                date: "Май 2025",
                color: "from-blue-500 to-blue-600"
              },
              {
                name: "Дмитрий",
                car: "BMW E90 330d",
                text: "Приехал с чиповкой от другого мастера — машина троила. Здесь всё сделали заново, проанализировали. Теперь едет как надо.",
                rating: 5,
                date: "Апрель 2025",
                color: "from-violet-500 to-purple-600"
              },
              {
                name: "Сергей",
                car: "BMW X5 F15 30d",
                text: "Убрал сажевик и мочевину. Всё чисто, без ошибок. Инженер всё объяснил, показал результаты до/после. Профессионалы.",
                rating: 5, 
                date: "Март 2025",
                color: "from-emerald-500 to-green-600"
              }
            ].map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-soft border border-slate-100 hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${review.color} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{review.name}</div>
                    <div className="text-xs text-slate-400">{review.car}</div>
                  </div>
                  <div className="ml-auto text-xs text-slate-300">{review.date}</div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="relative overflow-hidden rounded-2xl gradient-hero p-8 md:p-12">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-400 rounded-full blur-3xl" />
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Не нашли свою модель?</h3>
              <p className="text-blue-100/60 text-sm md:text-base">Позвоните — подберем решение для любого BMW</p>
            </div>
            <a 
              href="tel:+375291234567" 
              className="flex items-center gap-2.5 bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 text-sm md:text-base"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              +375 (29) 123-45-67
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
