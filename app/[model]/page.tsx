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
      color: "from-blue-500 to-blue-600",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>
    },
    {
      title: "Дилерское оборудование",
      description: "Работаем через ICOM. Проводим аудит параметров до и после прошивки.",
      color: "from-violet-500 to-purple-600",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
    },
    {
      title: "14 дней на проверку",
      description: "Если результат не устроит — вернем деньги и заводское ПО.",
      color: "from-emerald-500 to-green-600",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    },
  ];

  const recentWork = [
    { date: "12.06.2025", car: `BMW ${model} 3.0d`, work: "Stage 1 + EGR off", result: "+57 л.с.", positive: true },
    { date: "08.06.2025", car: `BMW ${model} 3.0i`, work: "Stage 1", result: "+17 л.с.", positive: true },
    { date: "01.06.2025", car: `BMW ${model} 4.4i`, work: "Stage 1 + DPF off", result: "+73 л.с.", positive: true },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero noise-bg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-blue-200 text-xs font-semibold rounded-full mb-5 border border-white/10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                {model === "X5" ? "BMW X5 (E70 / F15 / G05)" : `BMW ${model}`}
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
                Чип-тюнинг BMW {model}
              </h1>
              <p className="text-blue-100/60 text-sm md:text-base leading-relaxed mb-6 max-w-md">
                Настройка ПО двигателя и АКПП. Отключение экологии без ошибок на приборной панели.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {["Stage 1/2", "Гарантия", "ICOM"].map((tag, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-blue-100/80">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative animate-slide-in-right hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src={`${basePath}/bg/bg_${modelStr}.jpg`} 
                  alt={`BMW ${model}`} 
                  width={960}
                  height={540}
                  className="w-full h-auto object-cover"
                  priority
                  sizes="(max-width: 1024px) 0px, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-5">
            <div className="lg:hidden">
              <Quiz model={model} />
            </div>

            {/* Trust */}
            <div className="space-y-3">
              {trustMarkers.map((marker, idx) => (
                <div key={idx} className="bg-white rounded-xl p-5 shadow-soft border border-slate-100 hover-lift group">
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${marker.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      {marker.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1">{marker.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{marker.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-soft border border-slate-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">Прирост мощности (Stage 1)</h2>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">актуально</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[400px]">
                  <thead>
                    <tr className="border-b border-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                      <th className="px-5 py-3 font-semibold">Двигатель</th>
                      <th className="px-5 py-3 font-semibold">Завод</th>
                      <th className="px-5 py-3 font-semibold">Stage 1</th>
                      <th className="px-5 py-3 font-semibold text-blue-600">Прирост</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-900 text-sm">
                    <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-semibold">3.0d (M57)</td>
                      <td className="px-5 py-3.5 text-slate-400">218 / 500</td>
                      <td className="px-5 py-3.5 font-medium">275 / 600</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                          +57
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-semibold">3.0i (N52)</td>
                      <td className="px-5 py-3.5 text-slate-400">258 / 300</td>
                      <td className="px-5 py-3.5 font-medium">275 / 330</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                          +17
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 font-semibold">4.4i (N63)</td>
                      <td className="px-5 py-3.5 text-slate-400">407 / 600</td>
                      <td className="px-5 py-3.5 font-medium">480 / 750</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                          +73
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Work */}
            <div className="bg-white rounded-xl shadow-soft border border-slate-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">Последние работы</h2>
                <span className="text-xs text-slate-300">обновлено 14.06.2025</span>
              </div>
              <div className="divide-y divide-slate-50">
                {recentWork.map((item, i) => (
                  <div key={i} className="px-5 py-3.5 flex items-center justify-between text-sm hover:bg-slate-50/50 transition-colors">
                    <div>
                      <div className="font-semibold text-slate-900">{item.car}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.work}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-600 font-bold">{item.result}</div>
                      <div className="text-xs text-slate-300">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review */}
            <div className="bg-white rounded-xl shadow-soft border border-slate-100 p-5 hover-lift">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-md">А</div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Алексей</div>
                  <div className="text-xs text-slate-400">BMW {model} 3.0d</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1,2,3,4,5].map(j => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">После Stage 1 машина просто otraя. Разница ощутима сразу — и на низах, и на верхах. Убрал DPF, ошибок нет. Рекомендую.</p>
              <div className="text-xs text-slate-300 mt-3">Май 2025</div>
            </div>
          </div>
          
          {/* Quiz Sidebar */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-20 self-start">
            <Quiz model={model} />
          </div>
        </div>
      </section>
    </main>
  );
}
