import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const Quiz = dynamic(() => import("@/components/Quiz"));

const ALLOWED_MODELS = ["e39", "e46", "e60", "e90", "f01", "f10", "f30", "e70", "x5"];

const GAINS: Record<string, string> = {
  e39: "+45",
  e46: "+42",
  e60: "+57",
  e90: "+55",
  f01: "+65",
  f10: "+73",
  f30: "+68",
  e70: "+70",
  x5: "+85",
};

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
    title: `Чип-Тюнинг и Прошивка BMW ${model} | Bavaria Performance`,
    description: `Увеличение мощности Stage 1/2 и отключение экологии для BMW ${model}. Дилерское оборудование, гарантия результата.`,
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
  const maxGain = GAINS[modelStr] || "+50";

  const trustMarkers = [
    {
      iconPath: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
      title: "Собственные инженерные решения",
      description: "Мы не заливаем готовые прошивки из интернета. Софт настраивается индивидуально под ваш блок управления для сохранения ресурса двигателя.",
    },
    {
      iconPath: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
      title: "Дилерская диагностика",
      description: "Используем оборудование ICOM. Проводим глубокий аудит параметров двигателя до и после внесения изменений в ПО.",
    },
    {
      iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Гарантия результата",
      description: "Предоставляем 14 дней тест-драйва. Если вас не устроит динамика автомобиля, мы бесплатно вернем заводской софт и деньги.",
    },
  ];

  return (
    <main className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 md:space-y-16 relative">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      
      {/* Hero Section */}
      <section className="flex flex-col gap-8 md:gap-10">
        <div className="space-y-6 max-w-4xl relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 text-blue-700 text-xs md:text-sm font-semibold rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {model === "X5" ? "BMW X5 (E70 / F15 / G05)" : `BMW ${model}`}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="text-gray-900">Чип-тюнинг BMW {model} </span>
            <br/> 
            <span className="gradient-text">до {maxGain} л.с.</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 leading-relaxed max-w-3xl">
            Индивидуальная настройка ПО двигателя и АКПП: Stage 1 / Stage 2. Программное отключение экологии (EGR, DPF, SCR) без ошибок на приборной панели.
          </p>
        </div>

        {/* Image */}
        <div className="w-full relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/20 bg-gray-100">
            <Image 
              src={`${basePath}/bg/bg_${modelStr}.jpg`} 
              alt={`BMW ${model}`} 
              width={1920}
              height={1080}
              className="w-full h-auto max-h-[40vh] md:max-h-[60vh] object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="w-full lg:col-span-7 space-y-8 flex flex-col-reverse lg:flex-col">
          
          {/* Mobile Quiz loads logically below the content, Desktop sidebar */}
          <div className="lg:hidden w-full mb-8">
            <Quiz model={model} />
          </div>

          {/* Trust Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {trustMarkers.map((marker, idx) => (
              <div key={idx} className="group bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-sm p-6 md:p-8 hover:shadow-xl hover:bg-white transition-all duration-300 card-glow">
                <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                  <svg className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={marker.iconPath} />
                  </svg>
                </div>
                <h2 className="text-gray-900 font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {marker.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {marker.description}
                </p>
              </div>
            ))}
          </div>

          {/* Performance Table */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl p-6 md:p-8 w-full overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Прирост мощности (Stage 1)
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b-2 border-gray-100 text-gray-500 text-xs md:text-sm uppercase tracking-wide">
                    <th className="py-3 font-semibold">Двигатель</th>
                    <th className="py-3 font-semibold">Завод</th>
                    <th className="py-3 font-semibold">Stage 1</th>
                    <th className="py-3 font-semibold text-green-600">Прирост</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900 divide-y divide-gray-50">
                  <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                    <td className="py-4 font-semibold group-hover:text-blue-600 transition-colors">3.0d (M57)</td>
                    <td className="py-4 text-gray-600">218 л.с. / 500 Нм</td>
                    <td className="py-4 font-medium">275 л.с. / 600 Нм</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full shadow-lg shadow-green-500/30">
                        +57 л.с.
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                    <td className="py-4 font-semibold group-hover:text-blue-600 transition-colors">3.0i (N52)</td>
                    <td className="py-4 text-gray-600">258 л.с. / 300 Нм</td>
                    <td className="py-4 font-medium">275 л.с. / 330 Нм</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full shadow-lg shadow-green-500/30">
                        +17 л.с.
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
                    <td className="py-4 font-semibold group-hover:text-blue-600 transition-colors">4.4i (N63)</td>
                    <td className="py-4 text-gray-600">407 л.с. / 600 Нм</td>
                    <td className="py-4 font-medium">480 л.с. / 750 Нм</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full shadow-lg shadow-green-500/30">
                        +73 л.с.
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Quiz Sidebar (Desktop) */}
        <div className="hidden lg:block w-full lg:col-span-5 sticky top-28">
          <Quiz model={model} />
        </div>
      </section>
    </main>
  );
}
