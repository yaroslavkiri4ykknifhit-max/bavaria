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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 w-6 rounded-full transition-colors ${
                  step >= i ? "bg-gray-900" : "bg-gray-100"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs">{step}/3</span>
        </div>
        <h2 className="text-base font-semibold text-gray-900">
          Узнать стоимость для {model}
        </h2>
      </div>

      <div className="p-5">

      {step === 1 && (
        <div>
          <p className="text-gray-500 mb-3 text-sm">Какой тип двигателя?</p>
          <div className="flex flex-col gap-2">
            {[
              { name: "Бензин", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
              { name: "Дизель", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> }
            ].map((type) => (
              <button
                key={type.name}
                onClick={() => handleEngineSelect(type.name)}
                className={`min-h-[52px] w-full flex items-center gap-3 px-4 border rounded-lg transition-all text-sm font-medium ${
                  engine === type.name
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className={engine === type.name ? "text-blue-600" : "text-gray-400"}>
                  {type.icon}
                </span>
                {type.name}
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${engine === type.name ? "border-blue-600 bg-blue-600" : "border-gray-200"}`}>
                  {engine === type.name && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-gray-500 mb-3 text-sm">Что нужно сделать?</p>
          <div className="flex flex-col gap-2 mb-5">
            {[
              { name: "Stage 1 (Увеличение мощности)", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
              { name: "Удаление экологии (EGR/DPF/САТ)", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { name: "Отключение мочевины (AdBlue)", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg> }
            ].map((goal) => (
              <button
                key={goal.name}
                onClick={() => toggleGoal(goal.name)}
                className={`min-h-[52px] w-full flex items-center gap-3 px-4 border rounded-lg transition-all text-sm font-medium text-left ${
                  goals.includes(goal.name)
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className={goals.includes(goal.name) ? "text-blue-600" : "text-gray-400"}>
                  {goal.icon}
                </span>
                <span className="flex-1">{goal.name}</span>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                  goals.includes(goal.name) ? "bg-blue-600 border-blue-600" : "border-gray-200 bg-white"
                }`}>
                  {goals.includes(goal.name) && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(3)}
            disabled={goals.length === 0}
            className="w-full py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium"
          >
            Далее
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <p className="text-gray-500 mb-3 text-sm">Ваш телефон</p>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+375 (XX) XXX-XX-XX"
                className="w-full min-h-[48px] bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 text-sm font-medium text-gray-900 outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-gray-400"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 text-white w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round"/>
                </svg>
                Отправка...
              </>
            ) : (
              <>
                Получить расчет
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
          {error && (
            <p className="text-sm text-center text-red-500 mt-3">
              {error}
            </p>
          )}
          <p className="text-xs text-center text-gray-300 mt-3">
            Перезвоним в течение 10 минут
          </p>
        </form>
      )}
      </div>
    </div>
  );
}
