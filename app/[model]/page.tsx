import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cpu, Settings, ShieldCheck } from "lucide-react";
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
    title: `Профессиональный Чип-Тюнинг и Прошивка BMW ${model} | BAVARIA PERFORMANCE`,
    description: `Специализированный сервис BMW в Минске. Безопасное увеличение мощности Stage 1/2 на дилерском оборудовании для ${model}.`,
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
      icon: <Cpu className="w-8 h-8 text-black mb-4" strokeWidth={1.5} />,
      title: "Дилерское оборудование ICOM",
      description: "Безопасное чтение и запись прошивки на дилерском уровне. Никаких китайских сканеров.",
    },
    {
      icon: <Settings className="w-8 h-8 text-black mb-4" strokeWidth={1.5} />,
      title: "Индивидуальная калибровка",
      description: "Мы не заливаем скачанные из интернета файлы. Софт настраивается индивидуально под ваш блок управления (DME/DDE).",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-black mb-4" strokeWidth={1.5} />,
      title: "Тест-драйв 14 дней",
      description: "Даем 2 недели на проверку динамики. Не устроит результат — вернем заводскую прошивку и все деньги.",
    },
  ];

  return (
    <main className="min-h-screen py-8 md:py-24 px-4 md:px-6 max-w-7xl mx-auto space-y-12 md:space-y-20">
      
      {/* Hero Section */}
      <section className="flex flex-col gap-6 md:gap-10">
        <div className="space-y-6 md:space-y-8 max-w-4xl">
          <div className="inline-block border-2 border-black px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-sm font-bold tracking-widest uppercase text-black">
            СПЕЦИАЛИЗИРОВАННЫЙ СЕРВИС BMW В МИНСКЕ
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-black leading-tight uppercase">
            Профессиональный Чип-Тюнинг <br className="hidden md:block"/> BMW {model}
          </h1>
          <p className="text-base md:text-xl text-gray-700 leading-relaxed max-w-2xl">
            Программное отключение экологии (EGR, DPF, SCR) и безопасное увеличение мощности Stage 1/2 на дилерском оборудовании.
          </p>
        </div>

        {/* Инлайн-изображение вместо фона */}
        <div className="w-full border-2 border-black overflow-hidden bg-black mt-4 md:mt-0">
          <img 
            src={`${basePath}/bg/bg_${modelStr}.jpg`} 
            alt={`BMW ${model}`} 
            width="1920"
            height="1080"
            className="w-full h-auto max-h-[40vh] md:max-h-[60vh] object-cover opacity-90 hover:opacity-100 transition-opacity"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="w-full lg:col-span-7 space-y-8 md:space-y-12">
          {/* Trust Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trustMarkers.map((marker, idx) => (
              <div key={idx} className="bg-white border-2 border-black p-8">
                {marker.icon}
                <h2 className="text-black font-bold text-xl mb-3 tracking-wide uppercase">
                  {marker.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {marker.description}
                </p>
              </div>
            ))}
          </div>

          {/* Performance Table */}
          <div className="bg-white border-2 border-black p-4 md:p-10 w-full overflow-hidden">
            <h2 className="text-xl md:text-3xl font-bold text-black mb-6 md:mb-8 uppercase">
              Прирост мощности Stage 1
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b-2 border-black text-black uppercase tracking-wider text-xs md:text-sm">
                    <th className="py-4 font-bold">Мотор</th>
                    <th className="py-4 font-bold">Завод</th>
                    <th className="py-4 font-bold">Stage 1</th>
                    <th className="py-4 font-bold text-blue-600">Прирост</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 divide-y divide-gray-300">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 font-bold text-black">3.0d (M57)</td>
                    <td className="py-5">218 л.с. / 500 Нм</td>
                    <td className="py-5">275 л.с. / 600 Нм</td>
                    <td className="py-5 text-blue-600 font-bold">+57 л.с.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 font-bold text-black">3.0i (N52)</td>
                    <td className="py-5">258 л.с. / 300 Нм</td>
                    <td className="py-5">275 л.с. / 330 Нм</td>
                    <td className="py-5 text-blue-600 font-bold">+17 л.с.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 font-bold text-black">4.4i (N63)</td>
                    <td className="py-5">407 л.с. / 600 Нм</td>
                    <td className="py-5">480 л.с. / 750 Нм</td>
                    <td className="py-5 text-blue-600 font-bold">+73 л.с.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Quiz Sidebar */}
        <div className="w-full lg:col-span-5 lg:sticky lg:top-32">
          <Quiz model={model} />
        </div>
      </section>
    </main>
  );
}
