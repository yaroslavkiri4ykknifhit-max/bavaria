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
    <main className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 md:space-y-12">
      
      {/* Hero */}
      <section className="flex flex-col gap-6 md:gap-8">
        <div className="max-w-3xl">
          <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded uppercase tracking-wider mb-4">
            {model === "X5" ? "BMW X5 (E70 / F15 / G05)" : `BMW ${model}`}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
            Чип-тюнинг BMW {model}
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed">
            Индивидуальная настройка ПО двигателя и АКПП. Программное отключение экологии без ошибок на приборной панели.
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-lg bg-gray-100">
          <Image 
            src={`${basePath}/bg/bg_${modelStr}.jpg`} 
            alt={`BMW ${model}`} 
            width={1920}
            height={1080}
            className="w-full h-auto max-h-[35vh] md:max-h-[50vh] object-cover"
            priority
          />
        </div>
      </section>

      {/* Content */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="w-full lg:col-span-7 space-y-6">
          
          <div className="lg:hidden">
            <Quiz model={model} />
          </div>

          {/* Trust */}
          <div className="grid grid-cols-1 gap-4">
            {trustMarkers.map((marker, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-gray-900 font-semibold text-sm mb-1.5">
                  {marker.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {marker.description}
                </p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 w-full overflow-hidden">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Прирост мощности (Stage 1)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[450px]">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wide">
                    <th className="py-2 font-medium">Двигатель</th>
                    <th className="py-2 font-medium">Завод</th>
                    <th className="py-2 font-medium">Stage 1</th>
                    <th className="py-2 font-medium text-blue-600">Прирост</th>
                  </tr>
                </thead>
                <tbody className="text-gray-900 divide-y divide-gray-50 text-sm">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-medium">3.0d (M57)</td>
                    <td className="py-3 text-gray-500">218 л.с. / 500 Нм</td>
                    <td className="py-3">275 л.с. / 600 Нм</td>
                    <td className="py-3 text-blue-600 font-semibold">+57 л.с.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-medium">3.0i (N52)</td>
                    <td className="py-3 text-gray-500">258 л.с. / 300 Нм</td>
                    <td className="py-3">275 л.с. / 330 Нм</td>
                    <td className="py-3 text-blue-600 font-semibold">+17 л.с.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-medium">4.4i (N63)</td>
                    <td className="py-3 text-gray-500">407 л.с. / 600 Нм</td>
                    <td className="py-3">480 л.с. / 750 Нм</td>
                    <td className="py-3 text-blue-600 font-semibold">+73 л.с.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Quiz Sidebar */}
        <div className="hidden lg:block w-full lg:col-span-5 lg:sticky lg:top-24">
          <Quiz model={model} />
        </div>
      </section>
    </main>
  );
}
