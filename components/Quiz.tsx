"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";

type QuizProps = {
  model: string;
};

export default function Quiz({ model }: QuizProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [engine, setEngine] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [phone, setPhone] = useState("+375");

  const handleEngineSelect = (selected: string) => {
    setEngine(selected);
    setTimeout(() => setStep(2), 200);
  };

  const toggleGoal = (goal: string) => {
    setGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+375")) val = "+375";
    setPhone(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 13) {
      router.push("/thanks");
    }
  };

  return (
    <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 shadow-[0_15px_60px_-15px_rgba(255,255,255,0.05)] p-4 sm:p-6 md:p-10 w-full relative z-10 rounded-sm">
      <div className="mb-6 md:mb-10 flex items-center justify-between">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 w-12 transition-colors ${
                step >= i ? "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" : "bg-white/10"
              }`}
            />
          ))}
        </div>
        <span className="text-zinc-500 font-mono text-xs tracking-widest">ШАГ {step} / 3</span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8 uppercase tracking-wider leading-snug">
        ОТКРОЙТЕ СКРЫТЫЙ ПОТЕНЦИАЛ ВАШЕЙ {model}
      </h2>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-zinc-400 mb-6 font-bold uppercase text-sm tracking-wider">Выберите тип двигателя</p>
          <div className="flex flex-col gap-4">
            {["Бензин", "Дизель"].map((type) => (
              <button
                key={type}
                onClick={() => handleEngineSelect(type)}
                className={`min-h-[50px] md:min-h-[60px] w-full flex items-center justify-between px-4 md:px-6 border transition-all text-left text-base md:text-lg font-bold uppercase tracking-wide ${
                  engine === type
                    ? "border-blue-500 bg-blue-600/10 text-white shadow-[inset_0_0_20px_rgba(37,99,235,0.15)]"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/30"
                }`}
              >
                {type}
                {engine === type && <Check className="w-6 h-6 text-blue-500" strokeWidth={3} />}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-zinc-400 mb-6 font-bold uppercase text-sm tracking-wider">Что нужно сделать?</p>
          <div className="flex flex-col gap-3 mb-10">
            {[
              "Stage 1 (Увеличение мощности)", 
              "Удаление катализатора / Сажевого фильтра", 
              "Отключение мочевины (AdBlue)"
            ].map((goal) => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`min-h-[50px] md:min-h-[60px] w-full flex items-center gap-3 md:gap-4 px-4 md:px-6 border transition-all text-left text-sm md:text-base font-bold uppercase tracking-wide ${
                  goals.includes(goal)
                    ? "border-blue-500 bg-blue-600/10 text-white shadow-[inset_0_0_20px_rgba(37,99,235,0.15)]"
                    : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:border-white/30"
                }`}
              >
                <div
                  className={`w-6 h-6 flex-shrink-0 flex items-center justify-center border transition-colors ${
                    goals.includes(goal)
                      ? "bg-blue-600 border-blue-500"
                      : "border-white/30 bg-transparent"
                  }`}
                >
                  {goals.includes(goal) && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </div>
                {goal}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(3)}
            disabled={goals.length === 0}
            className="w-full py-5 bg-white hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-white text-black transition-colors flex items-center justify-center gap-2 font-bold uppercase tracking-widest"
          >
            ДАЛЕЕ
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-zinc-400 mb-6 font-bold uppercase text-sm tracking-wider">Куда прислать расчет?</p>
          <div className="mb-8">
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+375 (XX) XXX-XX-XX"
              className="w-full min-h-[60px] md:min-h-[70px] bg-white/5 border border-white/20 px-4 md:px-6 text-xl md:text-2xl font-bold text-white outline-none focus:border-blue-500 focus:bg-white/10 transition-all placeholder:text-zinc-600 placeholder:font-normal"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white w-full py-5 font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
          >
            РАССЧИТАТЬ СТОИМОСТЬ И СКИДКУ 10%
          </button>
        </form>
      )}
    </div>
  );
}
