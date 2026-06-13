"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Loader2 } from "lucide-react";

type QuizProps = {
  model: string;
};

export default function Quiz({ model }: QuizProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [engine, setEngine] = useState<string | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [phone, setPhone] = useState("+375");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 13 || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, engine, goals, phone }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      router.push("/thanks");
    } catch {
      setError("Не удалось отправить заявку. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl shadow-gray-200/50 p-6 md:p-8 w-full relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl -z-10" />
      
      <div className="mb-6 md:mb-8 flex items-center justify-between">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2.5 w-10 md:w-14 rounded-full transition-all duration-500 ${
                step >= i 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30" 
                  : "bg-gray-100"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-gray-600 font-semibold text-xs md:text-sm">Шаг {step} из 3</span>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 leading-snug">
        <span className="text-gray-500 font-normal">Узнать стоимость работ для</span>
        <br />
        <span className="gradient-text">{model}</span>
      </h2>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-gray-600 mb-4 font-medium text-sm md:text-base">Какой тип двигателя установлен?</p>
          <div className="flex flex-col gap-3">
            {["Бензин", "Дизель"].map((type) => (
              <button
                key={type}
                onClick={() => handleEngineSelect(type)}
                className={`min-h-[64px] w-full flex items-center justify-between px-6 border-2 rounded-2xl transition-all duration-300 text-left text-base font-semibold group ${
                  engine === type
                    ? "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                    : "border-gray-100 bg-white text-gray-700 hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    engine === type 
                      ? "bg-white/20" 
                      : "bg-gray-100 group-hover:bg-blue-100"
                  }`}>
                    {type === "Бензин" ? (
                      <svg className={`w-6 h-6 ${engine === type ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ) : (
                      <svg className={`w-6 h-6 ${engine === type ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                  </div>
                  {type}
                </div>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  engine === type 
                    ? "border-white bg-white/20 scale-110" 
                    : "border-gray-200 bg-transparent group-hover:border-blue-300"
                }`}>
                  {engine === type && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-gray-600 mb-4 font-medium text-sm md:text-base">Что необходимо сделать?</p>
          <div className="flex flex-col gap-3 mb-8">
            {[
              { name: "Stage 1 (Увеличение мощности)", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { name: "Удаление экологии (EGR/DPF/САТ)", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
              { name: "Отключение мочевины (AdBlue)", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" }
            ].map((goal) => (
              <button
                key={goal.name}
                onClick={() => toggleGoal(goal.name)}
                className={`min-h-[64px] w-full flex items-center gap-4 px-6 border-2 rounded-2xl transition-all duration-300 text-left text-sm md:text-base font-medium group ${
                  goals.includes(goal.name)
                    ? "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                    : "border-gray-100 bg-white text-gray-700 hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  goals.includes(goal.name) 
                    ? "bg-white/20" 
                    : "bg-gray-100 group-hover:bg-blue-100"
                }`}>
                  <svg className={`w-6 h-6 ${goals.includes(goal.name) ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={goal.icon} />
                  </svg>
                </div>
                <div className="flex-1">{goal.name}</div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 ${
                    goals.includes(goal.name)
                      ? "bg-white border-white scale-110"
                      : "border-gray-200 bg-white group-hover:border-blue-300"
                  }`}
                >
                  {goals.includes(goal.name) && <Check className="w-4 h-4 text-blue-600" strokeWidth={3} />}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(3)}
            disabled={goals.length === 0}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:hover:from-gray-300 disabled:hover:to-gray-300 text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] disabled:scale-100 disabled:shadow-none"
          >
            Продолжить
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-gray-600 mb-4 font-medium text-sm md:text-base">Оставьте телефон для расчета</p>
          <div className="mb-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+375 (XX) XXX-XX-XX"
                className="w-full min-h-[64px] bg-gray-50/80 border-2 border-gray-100 rounded-2xl pl-16 pr-5 text-lg font-medium text-gray-900 outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 transition-all duration-300 placeholder:text-gray-400"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:hover:from-gray-300 disabled:hover:to-gray-300 text-white w-full py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] disabled:scale-100 disabled:shadow-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                Получить расчет
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-center text-red-600 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Мы перезвоним в течение 10 минут
          </div>
        </form>
      )}
    </div>
  );
}
