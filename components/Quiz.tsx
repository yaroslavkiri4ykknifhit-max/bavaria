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
    <div className="bg-white border border-gray-200 rounded-lg p-5 md:p-6 w-full">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 w-8 md:w-10 rounded-full transition-colors ${
                step >= i ? "bg-blue-600" : "bg-gray-100"
              }`}
            />
          ))}
        </div>
        <span className="text-gray-400 text-xs">Шаг {step}/3</span>
      </div>

      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-5">
        Узнать стоимость для {model}
      </h2>

      {step === 1 && (
        <div>
          <p className="text-gray-600 mb-3 text-sm">Какой тип двигателя?</p>
          <div className="flex flex-col gap-2">
            {["Бензин", "Дизель"].map((type) => (
              <button
                key={type}
                onClick={() => handleEngineSelect(type)}
                className={`min-h-[52px] w-full flex items-center justify-between px-4 border rounded-lg transition-all text-sm font-medium ${
                  engine === type
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                {type}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${engine === type ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}>
                  {engine === type && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-gray-600 mb-3 text-sm">Что необходимо сделать?</p>
          <div className="flex flex-col gap-2 mb-5">
            {[
              "Stage 1 (Увеличение мощности)", 
              "Удаление экологии (EGR/DPF/САТ)", 
              "Отключение мочевины (AdBlue)"
            ].map((goal) => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`min-h-[52px] w-full flex items-center gap-3 px-4 border rounded-lg transition-all text-sm font-medium ${
                  goals.includes(goal)
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                    goals.includes(goal)
                      ? "bg-blue-600 border-blue-600"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {goals.includes(goal) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </div>
                {goal}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(3)}
            disabled={goals.length === 0}
            className="w-full py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
          >
            Продолжить
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <p className="text-gray-600 mb-3 text-sm">Ваш телефон для связи</p>
          <div className="mb-5">
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+375 (XX) XXX-XX-XX"
              className="w-full min-h-[52px] bg-gray-50 border border-gray-200 rounded-lg px-4 text-base font-medium text-gray-900 outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-gray-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                Получить расчет
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          {error && (
            <p className="text-sm text-center text-red-500 mt-3">
              {error}
            </p>
          )}
          <p className="text-xs text-center text-gray-400 mt-3">
            Перезвоним в течение 10 минут
          </p>
        </form>
      )}
    </div>
  );
}
