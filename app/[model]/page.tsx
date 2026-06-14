import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const Quiz = dynamic(() => import("@/components/Quiz"));

const ALLOWED_MODELS = ["e39", "e46", "e60", "e90", "f01", "f10", "f30", "e70", "x5"];

export function generateStaticParams() {
  return ALLOWED_MODELS.map((model) => ({
    model,
  }));
}

type Props = {
  params: Promise<{ model: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const model = resolvedParams.model.toUpperCase();

  return {
    title: `Чип-Тюнинг BMW ${model} | Bavaria Performance`,
    description: `Увеличение мощности и отключение экологии для BMW ${model}. Гарантия результата.`,
  };
}

export default async function ModelPage({ params }: Props) {
  const resolvedParams = await params;
  const modelStr = resolvedParams.model.toLowerCase();

  if (!ALLOWED_MODELS.includes(modelStr)) {
    notFound();
  }

  const model = modelStr.toUpperCase();
  const basePath = process.env.NODE_ENV === "production" ? "/bavaria" : "";

  const trustMarkers = [
    {
      title: "Индивидуальная настройка",
      description: "Не заливаем готовые прошивки. Софт настраивается под конкретный блок управления.",
    },
    {
      title: "Дилерское оборудование",
      description: "Работаем через ICOM. Проводим аудит параметров до и после прошивки.",
    },
    {
      title: "14 дней на проверку",
      description: "Если результат не устроит — вернем деньги и заводское ПО.",
    },
  ];

  const recentWork = [
    { date: "12.06.2025", car: `BMW ${model} 3.0d`, work: "Stage 1 + EGR off", result: "+57 л.с." },
    { date: "08.06.2025", car: `BMW ${model} 3.0i`, work: "Stage 1", result: "+17 л.с." },
    { date: "01.06.2025", car: `BMW ${model} 4.4i`, work: "Stage 1 + DPF off", result: "+73 л.с." },
  ];

  const reviews: Record<string, { name: string; car: string; text: string; date: string }> = {
    e39: {
      name: "Олег",
      car: "BMW 530d (E39)",
      text: "Классика жанра — M57 на E39. Машина была в плачевном состоянии после предыдущего владельца: кривая прошивка, дым, ошибки. Ребята всё сделали с нуля — полный бэкап, удаление сажевика, индивидуальная калибровка. E39 задышала как в 2003-м. Расход стал адекватным, тяга ровная по всему диапазону. Работают с этим мотором как нужно.",
      date: "Июнь 2025"
    },
    e46: {
      name: "Андрей",
      car: "BMW 330d (E46)",
      text: "Привез E46 с M57 — мотор легендарный, но к этому возрасту уже всё понемногу сыпется. Инженеры сначала диагностировали состояние, проверили форсунки и турбину. Только убедившись что мотор здоров, залили Stage 1. Разница колоссальная — машина раньше была ватной, сейчас едет как должна. Плюс убрали EGR, который уже душил мотор. Рекомендую.",
      date: "Май 2025"
    },
    e60: {
      name: "Виктор",
      car: "BMW 535i (E60)",
      text: "N54 на E60 — мотор с потенциалом, но требующий внимания. Приехал с жалобой на потерю тяги и повышенный расход. Оказалось, что предыдущая прошивка была залита без учёта состояния турбин. Здесь всё сделали правильно: диагностика, бэкап, индивидуальная калибровка под мои турбины. Машина поехала как новая. Очень доволен подходом.",
      date: "Апрель 2025"
    },
    e90: {
      name: "Денис",
      car: "BMW 330d (E90)",
      text: "E90 с M57 — надёжный мотор, но после 200 тысяч ему нужна забота. Приехал для Stage 1, но инженеры честно сказали, что сначала надо поменять форсунки и проверить турбину. Сделали всё по порядку, потом залили прошивку. Результат — +57 л.с. и расход упал на 1.2 литра. Нравится честный подход, без навязывания лишнего.",
      date: "Июнь 2025"
    },
    f01: {
      name: "Роман",
      car: "BMW 740d (F01)",
      text: "F01 с N57 — тяжелый luxury-седан, которому не хватало динамики. После Stage 1 машина ожила: подхват стал моментальным, расход не вырос. Параллельно удалили сажевик — на этом моторе он забивается регулярно. Инженеры всё сделали аккуратно, показали результаты диагностики до и после. Профессиональный подход к дорогому авто.",
      date: "Май 2025"
    },
    f10: {
      name: "Алексей",
      car: "BMW 535i (F10)",
      text: "Приехал с чиповкой от другого мастера — машина троила, горел чек. Здесь всё сделали заново: полный бэкап блока, удалили кривую прошивку, залили индивидуальную калибровку. Заодно убрали сажевик, который уже душил мотор. Теперь едет как надо — ровно, мощно, без ошибок. Разница с предыдущей прошивкой как день и ночь.",
      date: "Апрель 2025"
    },
    f30: {
      name: "Дмитрий",
      car: "BMW 320d (F30)",
      text: "Долго сомневался, шить ли свой B47. Боялся, что после чип-тюнинга ляжет турбина или коробка не выдержит крутящего момента. Парни всё детально объяснили, сняли логи до прошивки, проверили форсунки и турбину. Только убедившись, что мотор в идеале, залили калибровку Stage 1. Динамика стала сумасшедшая, особенно подхват после 100 км/ч на трассе. Рекомендую именно эту команду.",
      date: "Март 2025"
    },
    e70: {
      name: "Сергей",
      car: "BMW X5 3.0d (E70)",
      text: "E70 с M57 — надёжный блок, но сажевик на этом поколении — слабое место. Машина упала в аварийный режим, дилер кричал цену замены. Здесь всё сделали за один день: физическое удаление сажи, программное отключение EGR, индивидуальная прошивка. Машину не узнать — задышала, расход упал, никаких ошибок. Жалею, что тянул полгода.",
      date: "Июнь 2025"
    },
    x5: {
      name: "Михаил",
      car: "BMW X5 3.0d (F15)",
      text: "Началось с того, что машина просто упала в аварийный режим на трассе. Диагностика у дилера приговорила сажевый фильтр — замена выходила в космические деньги. Приехал сюда по рекомендации. Сделали всё под ключ: грамотно удалили сажу физически, заглушили EGR и программно отшили всё это на индивидуальной калибровке. Заодно залили легкий Stage 1. Машину не узнать — задышала, коробка стала щелкать передачи идеально плавно, а расход упал на 1.5 литра.",
      date: "Май 2025"
    },
  };

  const currentReview = reviews[modelStr] || reviews.e39;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-black text-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-[#e11d48] text-xs font-bold tracking-widest uppercase mb-3">
                {model === "X5" ? "BMW X5 (E70 / F15 / G05)" : `BMW ${model}`}
              </p>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-3">
                Чип-тюнинг BMW {model}
              </h1>
              <p className="text-white/50 text-sm md:text-base leading-relaxed mb-5 max-w-md">
                Настройка ПО двигателя и АКПП. Отключение экологии без ошибок на приборной панели.
              </p>
              <div className="flex items-center gap-4 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                  Stage 1/2
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                  Гарантия
                </span>
              </div>
            </div>
            
            <div>
              <div className="relative">
                <Image 
                  src={`${basePath}/bg/bg_${modelStr}.jpg`} 
                  alt={`BMW ${model}`} 
                  width={960}
                  height={540}
                  className="w-full h-auto object-cover opacity-80"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="lg:hidden">
              <Quiz model={model} />
            </div>

            {/* Trust */}
            <div className="space-y-3">
              {trustMarkers.map((marker, idx) => (
                <div key={idx} className="bg-white border border-[#eee] p-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#e11d48] flex items-center justify-center text-white text-xs font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#111] mb-0.5">{marker.title}</h3>
                      <p className="text-sm text-[#888] leading-relaxed">{marker.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white border border-[#eee] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#eee] flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#111]">Прирост мощности (Stage 1)</h2>
                <span className="text-xs text-[#e11d48] font-bold">актуально</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[400px]">
                  <thead>
                    <tr className="border-b border-[#eee] text-[#999] text-xs uppercase tracking-wide">
                      <th className="px-4 py-2.5 font-semibold">Двигатель</th>
                      <th className="px-4 py-2.5 font-semibold">Завод</th>
                      <th className="px-4 py-2.5 font-semibold">Stage 1</th>
                      <th className="px-4 py-2.5 font-semibold text-[#e11d48]">Прирост</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#111] text-sm">
                    <tr className="border-b border-[#f5f5f5]">
                      <td className="px-4 py-3 font-semibold">3.0d (M57)</td>
                      <td className="px-4 py-3 text-[#999]">218 / 500</td>
                      <td className="px-4 py-3">275 / 600</td>
                      <td className="px-4 py-3 text-[#e11d48] font-bold">+57</td>
                    </tr>
                    <tr className="border-b border-[#f5f5f5]">
                      <td className="px-4 py-3 font-semibold">3.0i (N52)</td>
                      <td className="px-4 py-3 text-[#999]">258 / 300</td>
                      <td className="px-4 py-3">275 / 330</td>
                      <td className="px-4 py-3 text-[#e11d48] font-bold">+17</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">4.4i (N63)</td>
                      <td className="px-4 py-3 text-[#999]">407 / 600</td>
                      <td className="px-4 py-3">480 / 750</td>
                      <td className="px-4 py-3 text-[#e11d48] font-bold">+73</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Work */}
            <div className="bg-white border border-[#eee] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#eee] flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#111]">Последние работы</h2>
                <span className="text-xs text-[#ccc]">14.06.2025</span>
              </div>
              <div className="divide-y divide-[#f5f5f5]">
                {recentWork.map((item, i) => (
                  <div key={i} className="px-4 py-3 flex items-center justify-between text-sm">
                    <div>
                      <div className="font-semibold text-[#111]">{item.car}</div>
                      <div className="text-xs text-[#aaa] mt-0.5">{item.work}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#e11d48] font-bold">{item.result}</div>
                      <div className="text-xs text-[#ccc]">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review */}
            <div className="bg-[#fafafa] border border-[#eee] p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 bg-[#111] flex items-center justify-center text-white text-xs font-bold">
                  {currentReview.name[0]}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#111]">{currentReview.name}</div>
                  <div className="text-xs text-[#aaa]">{currentReview.car}</div>
                </div>
                <div className="text-xs text-[#ccc]">{currentReview.date}</div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(j => (
                  <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#e11d48" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#555] leading-relaxed">{currentReview.text}</p>
            </div>
          </div>
          
          {/* Quiz Sidebar */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-16 self-start">
            <Quiz model={model} />
          </div>
        </div>
      </section>
    </main>
  );
}
