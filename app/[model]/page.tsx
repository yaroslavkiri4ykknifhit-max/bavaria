import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cpu, Settings, ShieldCheck } from "lucide-react";
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
      icon: <Cpu className="w-6 h-6 text-blue-600 mb-3" strokeWidth={2} />,
      title: "Собственные инженерные решения",
      description: "Мы не заливаем готовые прошивки из интернета. Софт настраивается индивидуально под ваш блок управления для сохранения ресурса двигателя.",
    },
    {
      icon: <Settings className="w-6 h-6 text-blue-600 mb-3" strokeWidth={2} />,
      title: "Дилерская диагностика",
      description: "Используем оборудование ICOM. Проводим глубокий аудит параметров двигателя до и после внесения изменений в ПО.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600 mb-3" strokeWidth={2} />,
      title: "Гарантия результата",
      description: "Предоставляем 14 дней тест-драйва. Если вас не устроит динамика автомобиля, мы бесплатно вернем заводской софт и деньги.",
    },
  ];

  return (
    <main className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 md:space-y-16">
      
      {/* Hero Section */}
      <section className="flex flex-col gap-8 md:gap-10">
        <div className="space-y-6 max-w-4xl">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs md:text-sm font-semibold rounded-full uppercase tracking-wide">
            {model === "X5" ? "BMW X5 (E70 / F15 / G05)" : `BMW ${model}`}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Чип-тюнинг BMW {model} <br/> <span className="text-blue-600">до {maxGain} л.с.</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 leading-relaxed max-w-3xl">
            Индивидуальная настройка ПО двигателя и АКПП: Stage 1 / Stage 2. Программное отключение экологии (EGR, DPF, SCR) без ошибок на приборной панели.
          </p>
        </div>

        {/* Image */}
        <div className="w-full overflow-hidden rounded-xl shadow-md border border-gray-200 bg-gray-100">
          <img 
            src={`${basePath}/bg/bg_${modelStr}.jpg`} 
            alt={`BMW ${model}`} 
            width="1920"
            height="1080"
            className="w-full h-auto max-h-[40vh] md:max-h-[60vh] object-cover"
            fetchPriority="high"
            decoding="async"
          />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trustMarkers.map((marker, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8">
                {marker.icon}
                <h2 className="text-gray-900 font-bold text-lg mb-2">
                  {marker.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {marker.description}
                </p>
              </div>
            ))}
          </div>

          {/* Performance Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 w-full overflow-hidden">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Прирост мощности (Stage 1)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-gray-500 text-xs md:text-sm uppercase tracking-wide">
                    <th className="py-3 font-semibold">Двигатель</th>
                    <th className="py-3 font-semibold">Завод</th>
                    <th className="py-3 font-semibold">Stage 1</th>
                    <th className="py-3 font-semibold text-blue-600">Прирост</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900 divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-semibold">3.0d (M57)</td>
                    <td className="py-4 text-gray-600">218 л.с. / 500 Нм</td>
                    <td className="py-4 font-medium">275 л.с. / 600 Нм</td>
                    <td className="py-4 text-blue-600 font-bold">+57 л.с.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-semibold">3.0i (N52)</td>
                    <td className="py-4 text-gray-600">258 л.с. / 300 Нм</td>
                    <td className="py-4 font-medium">275 л.с. / 330 Нм</td>
                    <td className="py-4 text-blue-600 font-bold">+17 л.с.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-semibold">4.4i (N63)</td>
                    <td className="py-4 text-gray-600">407 л.с. / 600 Нм</td>
                    <td className="py-4 font-medium">480 л.с. / 750 Нм</td>
                    <td className="py-4 text-blue-600 font-bold">+73 л.с.</td>
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
