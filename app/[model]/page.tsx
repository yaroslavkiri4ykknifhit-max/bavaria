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
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>
    },
    {
      title: "Дилерское оборудование",
      description: "Работаем через ICOM. Проводим аудит параметров до и после прошивки.",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
    },
    {
      title: "14 дней на проверку",
      description: "Если результат не устроит — вернем деньги и заводское ПО.",
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                {model === "X5" ? "BMW X5 (E70 / F15 / G05)" : `BMW ${model}`}
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
                Чип-тюнинг BMW {model}
              </h1>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-5 max-w-md">
                Настройка ПО двигателя и АКПП. Отключение экологии без ошибок на приборной панели.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                  Stage 1/2
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <path d="M22 4L12 14.01l-3-3"/>
                  </svg>
                  Гарантия
                </span>
              </div>
            </div>
            
            <div className="aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src={`${basePath}/bg/bg_${modelStr}.jpg`} 
                alt={`BMW ${model}`} 
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="lg:hidden">
              <Quiz model={model} />
            </div>

            {/* Trust */}
            <div className="space-y-3">
              {trustMarkers.map((marker, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-9 h-9 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                      {marker.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-0.5">{marker.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{marker.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">Прирост мощности (Stage 1)</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[400px]">
                  <thead>
                    <tr className="border-b border-gray-50 text-gray-400 text-xs uppercase tracking-wide">
                      <th className="px-4 py-2.5 font-medium">Двигатель</th>
                      <th className="px-4 py-2.5 font-medium">Завод</th>
                      <th className="px-4 py-2.5 font-medium">Stage 1</th>
                      <th className="px-4 py-2.5 font-medium text-blue-600">Прирост</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-900 text-sm">
                    <tr className="border-b border-gray-50">
                      <td className="px-4 py-3 font-medium">3.0d (M57)</td>
                      <td className="px-4 py-3 text-gray-400">218 / 500</td>
                      <td className="px-4 py-3">275 / 600</td>
                      <td className="px-4 py-3 text-blue-600 font-medium">+57</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="px-4 py-3 font-medium">3.0i (N52)</td>
                      <td className="px-4 py-3 text-gray-400">258 / 300</td>
                      <td className="px-4 py-3">275 / 330</td>
                      <td className="px-4 py-3 text-blue-600 font-medium">+17</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">4.4i (N63)</td>
                      <td className="px-4 py-3 text-gray-400">407 / 600</td>
                      <td className="px-4 py-3">480 / 750</td>
                      <td className="px-4 py-3 text-blue-600 font-medium">+73</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
