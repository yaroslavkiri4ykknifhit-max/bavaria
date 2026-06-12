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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 w-full relative z-10">
      <div className="mb-6 md:mb-8 flex items-center justify-between">
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-10 md:w-12 rounded-full transition-colors ${
                step >= i ? "bg-blue-600" : "bg-gray-100"
              }`}
            />
          ))}
        </div>
        <span className="text-gray-400 font-medium text-xs md:text-sm">Шаг {step} из 3</span>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 leading-snug">
        Узнать стоимость работ для {model}
      </h2>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-gray-600 mb-4 font-medium text-sm md:text-base">Какой тип двигателя установлен?</p>
          <div className="flex flex-col gap-3">
            {["Бензин", "Дизель"].map((type) => (
              <button
                key={type}
                onClick={() => handleEngineSelect(type)}
                className={`min-h-[56px] w-full flex items-center justify-between px-5 border rounded-lg transition-all text-left text-base font-semibold ${
                  engine === type
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {type}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${engine === type ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-transparent"}`}>
                  {engine === type && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-gray-600 mb-4 font-medium text-sm md:text-base">Что необходимо сделать?</p>
          <div className="flex flex-col gap-3 mb-8">
            {[
              "Stage 1 (Увеличение мощности)", 
              "Удаление экологии (EGR/DPF/САТ)", 
              "Отключение мочевины (AdBlue)"
            ].map((goal) => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`min-h-[56px] w-full flex items-center gap-4 px-5 border rounded-lg transition-all text-left text-sm md:text-base font-medium ${
                  goals.includes(goal)
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-5 h-5 flex-shrink-0 rounded flex items-center justify-center border-2 transition-colors ${
                    goals.includes(goal)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {goals.includes(goal) && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </div>
                {goal}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(3)}
            disabled={goals.length === 0}
            className="w-full py-4 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-gray-900 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            Продолжить
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-gray-600 mb-4 font-medium text-sm md:text-base">Оставьте телефон для расчета</p>
          <div className="mb-6">
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+375 (XX) XXX-XX-XX"
              className="w-full min-h-[56px] bg-gray-50 border border-gray-200 rounded-lg px-5 text-lg font-medium text-gray-900 outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white w-full py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
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
            <p className="text-sm text-center text-red-500 mt-4">
              {error}
            </p>
          )}
          <p className="text-xs text-center text-gray-400 mt-4">
            Мы перезвоним в течение 10 минут
          </p>
        </form>
      )}
    </div>
  );
}
