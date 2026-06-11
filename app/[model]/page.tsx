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
  const maxGain = GAINS[modelStr] || "+50";

  const trustMarkers = [
    {
      icon: <Cpu className="w-8 h-8 text-blue-500 mb-4" strokeWidth={1.5} />,
      title: "Профессиональное Инженерное ПО",
      description: "Никаких 'прошивок из интернета'. Прямой доступ к калибровкам ЭБУ (MSD80/DDE/DME). Безопасное увеличение мощности без снижения ресурса.",
    },
    {
      icon: <Settings className="w-8 h-8 text-blue-500 mb-4" strokeWidth={1.5} />,
      title: "Дилерский Уровень Диагностики",
      description: "Оборудование ICOM (Германия). Глубокий аудит параметров двигателя до начала работ. 100% стабильность софта.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-500 mb-4" strokeWidth={1.5} />,
      title: "Строгий Performance Moneyback",
      description: "14 дней тест-драйва. Если вас не устроит динамика, мы бесплатно вернем заводской софт и 100% оплаты.",
    },
  ];

  return (
    <main className="min-h-screen py-8 md:py-24 px-4 md:px-6 max-w-7xl mx-auto space-y-12 md:space-y-20">
      
      {/* Hero Section */}
      <section className="flex flex-col gap-6 md:gap-10">
        <div className="space-y-6 md:space-y-8 max-w-5xl">
          <div className="inline-block border border-blue-500/30 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-sm font-bold tracking-widest uppercase text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
            СПЕЦИАЛИЗИРОВАННЫЙ СЕРВИС BMW В МИНСКЕ
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase tracking-wide">
            BMW {model} ECU CALIBRATION <span className="text-blue-500">(до {maxGain} л.с.)</span>
          </h1>
          <h2 className="text-lg md:text-2xl text-zinc-300 leading-relaxed font-medium">
            Независимая оптимизация ПО двигателя и АКПП: Stage 1/2, Евро-2, Полное отключение экологии M57/N47/B47/B57. Дилерский ICOM.
          </h2>
          <p className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-3xl">
            Мы знаем специфику блоков вашей BMW {model === "X5" ? "X5 (E70/F15/G05)" : model}. Гарантируем безопасность заводских защитных лимитов и корректную работу всех узлов после настройки.
          </p>
        </div>

        {/* Image */}
        <div className="w-full border border-white/10 overflow-hidden bg-zinc-950 mt-4 md:mt-0 shadow-[0_15px_60px_-15px_rgba(255,255,255,0.05)] rounded-sm">
          <img 
            src={`${basePath}/bg/bg_${modelStr}.jpg`} 
            alt={`BMW ${model}`} 
            width="1920"
            height="1080"
            className="w-full h-auto max-h-[40vh] md:max-h-[60vh] object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
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
              <div key={idx} className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_15px_60px_-15px_rgba(255,255,255,0.05)] p-8 transition-colors hover:border-white/20 rounded-sm">
                {marker.icon}
                <h2 className="text-white font-bold text-xl mb-3 tracking-wide uppercase">
                  {marker.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  {marker.description}
                </p>
              </div>
            ))}
          </div>

          {/* Performance Table */}
          <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_15px_60px_-15px_rgba(255,255,255,0.05)] p-4 md:p-10 w-full overflow-hidden rounded-sm">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-6 md:mb-8 uppercase tracking-wide">
              Прирост мощности Stage 1
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/20 text-zinc-400 uppercase tracking-wider text-xs md:text-sm">
                    <th className="py-4 font-bold">Мотор</th>
                    <th className="py-4 font-bold">Завод</th>
                    <th className="py-4 font-bold text-white">Stage 1</th>
                    <th className="py-4 font-bold text-blue-500">Прирост</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300 divide-y divide-white/10">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-5 font-bold text-white">3.0d (M57)</td>
                    <td className="py-5 text-zinc-400">218 л.с. / 500 Нм</td>
                    <td className="py-5">275 л.с. / 600 Нм</td>
                    <td className="py-5 text-blue-500 font-bold">+57 л.с.</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-5 font-bold text-white">3.0i (N52)</td>
                    <td className="py-5 text-zinc-400">258 л.с. / 300 Нм</td>
                    <td className="py-5">275 л.с. / 330 Нм</td>
                    <td className="py-5 text-blue-500 font-bold">+17 л.с.</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-5 font-bold text-white">4.4i (N63)</td>
                    <td className="py-5 text-zinc-400">407 л.с. / 600 Нм</td>
                    <td className="py-5">480 л.с. / 750 Нм</td>
                    <td className="py-5 text-blue-500 font-bold">+73 л.с.</td>
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
