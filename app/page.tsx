import Link from "next/link";
import Image from "next/image";
import ReviewCard from "@/components/ReviewCard";

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
      <section className="bg-black text-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-[#e11d48] text-xs font-bold tracking-widest uppercase mb-4">Чип-тюнинг BMW</p>
              <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold leading-[1.05] tracking-tight mb-4">
                Настройка BMW
                <br/>
                <span className="text-[#e11d48]">с гарантией результата</span>
              </h1>
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 max-w-md">
                Увеличение мощности, отключение экологии. Работаем с блоками управления DME/DDE через дилерское оборудование.
              </p>
              
              <div className="flex flex-col gap-2 mb-8">
                {["Без ошибок на панели", "14 дней на проверку", "Оборудование ICOM"].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-white/60">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-8">
                {[
                  { value: "7+", label: "лет опыта" },
                  { value: "500+", label: "прошитых авто" },
                  { value: "4.9", label: "рейтинг" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/30">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="relative">
                <Image 
                  src={`${basePath}/bg/main_bg.jpg`} 
                  alt="BMW Tuning Garage" 
                  width={960}
                  height={540}
                  className="w-full h-auto object-cover opacity-80"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute -bottom-3 -left-3 bg-[#e11d48] text-white px-4 py-2 text-xs font-bold">
                  500+ прошитых авто
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10 md:py-14">
        <h2 className="text-lg font-bold text-[#111] mb-1">Выберите модель</h2>
        <p className="text-sm text-[#888] mb-6">Нажмите для расчета стоимости</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#ddd] border border-[#ddd]">
          {models.map((model) => (
            <Link 
              key={model.id} 
              href={`/${model.id}`}
              className="group bg-white px-5 py-4 flex items-center justify-between hover:bg-[#f5f5f5] transition-colors"
            >
              <div>
                <span className="text-sm font-semibold text-[#111] block">{model.name}</span>
                <span className="text-xs text-[#aaa]">{model.gen}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" className="group-hover:stroke-[#e11d48] transition-colors">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          ))}
        </div>

        {/* Не нашли модель */}
        <div className="mt-4 bg-[#111] px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white mb-0.5">Не нашли свою модель?</h3>
            <p className="text-xs text-white/40">Позвоните — подберем решение для любого BMW</p>
          </div>
          <a 
            href="tel:+375291234567" 
            className="flex items-center gap-2 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold px-5 py-2.5 text-sm transition-colors flex-shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            +375 (29) 123-45-67
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#111] text-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10 md:py-14">
          <h2 className="text-lg font-bold mb-8">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                num: "01",
                title: "Оставляете заявку", 
                desc: "Выбираете модель и указываете телефон",
              },
              { 
                num: "02",
                title: "Консультация", 
                desc: "Инженер связывается и обсуждает задачу",
              },
              { 
                num: "03",
                title: "Прошивка", 
                desc: "Настраиваем ПО и проверяем результат",
              },
            ].map((step) => (
              <div key={step.num} className="border-l-2 border-[#e11d48] pl-5">
                <div className="text-[#e11d48] text-xs font-bold mb-2">{step.num}</div>
                <h3 className="text-base font-bold mb-1">{step.title}</h3>
                <p className="text-sm text-white/40">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10 md:py-14">
        <h2 className="text-lg font-bold text-[#111] mb-6">Гарантии</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "14 дней на возврат", desc: "Если результат не устроит — вернем деньги" },
            { title: "Без ошибок", desc: "Проверяем сканером после прошивки" },
            { title: "Запись ПО", desc: "Сохраним вашу заводскую прошивку" },
            { title: "Честная оценка", desc: "Скажем, если прошивка не даст эффект" },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-[#eee] p-4">
              <div className="w-8 h-8 bg-[#e11d48] flex items-center justify-center text-white text-xs font-bold mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-sm font-bold text-[#111] mb-1">{item.title}</h3>
              <p className="text-xs text-[#888] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-white border-y border-[#eee]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-10 md:py-14">
          <h2 className="text-lg font-bold text-[#111] mb-6">Отзывы клиентов</h2>
          <div className="space-y-4">
            <ReviewCard
              name="Михаил"
              suffix="42 года"
              car="BMW X5 3.0d (F15)"
              date="Май 2025"
              text="Началось с того, что машина просто упала в аварийный режим на трассе. Диагностика у дилера приговорила сажевый фильтр — замена выходила в космические деньги. Искал, где вырезать, но панически боялся гаражных мастеров, которые льют кривые прошивки из складчин, после которых машина дымит как паровоз. Приехал сюда по рекомендации. Подкупило, что ребята работают дилерским шнурком ICOM. Сделали всё под ключ: грамотно удалили сажу физически, заглушили EGR и программно отшили всё это на индивидуальной калибровке. Заодно залили легкий Stage 1. Машину не узнать — задышала, коробка стала щелкать передачи идеально плавно, а расход упал на 1.5 литра. Никакого черного дыма. Жалею, что не сделал этого два года назад."
            />
            <ReviewCard
              name="Сергей"
              car="BMW 528i (F10)"
              date="Апрель 2025"
              text="Полгода мучался с чеком по катализатору (ошибка P0420). Расход вырос до 16 литров, тяга пропала, мотор работал жестко. До этого заехал на одно СТО, где мне предложили просто «погасить лампочку» обманкой. Отказался от этого колхоза. Здесь инженеры подошли к вопросу фундаментально: сделали полный бэкап моего блока, перевели на честный Евро-2 с сохранением всех заводских защитных алгоритмов мотора. Сразу видно, что люди понимают архитектуру блоков BMW, а не просто кнопки нажимают. Чек ушел навсегда, холостые обороты стоят как вкопанные. Очень достойный инженерный подход."
            />
            <ReviewCard
              name="Дмитрий"
              suffix="Минск"
              car="BMW 320d (F30)"
              date="Март 2025"
              text="Долго сомневался, шить ли свой B47. Боялся, что после чип-тюнинга ляжет турбина или коробка не выдержит крутящего момента. Парни всё детально объяснили, сняли логи до прошивки, проверили форсунки и турбину. Только убедившись, что мотор в идеале, залили калибровку Stage 1. Огромный плюс — дали 14 дней на тест-драйв с гарантией возврата денег, если не зайдет. Но возвращать ничего не собираюсь. Динамика стала сумасшедшая, особенно подхват после 100 км/ч на трассе. При спокойной езде ресурс не страдает вообще. Рекомендую именно эту команду."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
