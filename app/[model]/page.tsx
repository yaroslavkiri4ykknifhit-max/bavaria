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
            
            <div className="hidden lg:block">
              <div className="relative">
                <Image 
                  src={`${basePath}/bg/bg_${modelStr}.jpg`} 
                  alt={`BMW ${model}`} 
                  width={960}
                  height={540}
                  className="w-full h-auto object-cover opacity-80"
                  priority
                  sizes="(max-width: 1024px) 0px, 50vw"
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
            <div className="bg-white border border-[#eee] p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[#111] flex items-center justify-center text-white text-xs font-bold">А</div>
                <div>
                  <div className="text-sm font-bold text-[#111]">Алексей</div>
                  <div className="text-xs text-[#aaa]">BMW {model} 3.0d</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1,2,3,4,5].map(j => (
                    <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="#e11d48" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#555] leading-relaxed">После Stage 1 машина просто otraя. Разница ощутима сразу — и на низах, и на верхах. Убрал DPF, ошибок нет. Рекомендую.</p>
              <div className="text-xs text-[#ccc] mt-2">Май 2025</div>
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
