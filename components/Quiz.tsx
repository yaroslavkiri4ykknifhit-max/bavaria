"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="bg-white border border-[#eee] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#eee]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 w-6 ${
                  step >= i ? "bg-[#e11d48]" : "bg-[#eee]"
                }`}
              />
            ))}
          </div>
          <span className="text-[#ccc] text-xs">{step}/3</span>
        </div>
        <h2 className="text-sm font-bold text-[#111]">
          Стоимость для <span className="text-[#e11d48]">{model}</span>
        </h2>
      </div>

      <div className="p-5">

      {step === 1 && (
        <div>
          <p className="text-[#888] mb-3 text-sm">Какой тип двигателя?</p>
          <div className="flex flex-col gap-2">
            {[
              { name: "Бензин" },
              { name: "Дизель" }
            ].map((type) => (
              <button
                key={type.name}
                onClick={() => handleEngineSelect(type.name)}
                className={`min-h-[48px] w-full flex items-center justify-between px-4 border transition-colors text-sm font-semibold ${
                  engine === type.name
                    ? "border-[#e11d48] bg-[#fef2f2] text-[#111]"
                    : "border-[#eee] bg-white text-[#555] hover:border-[#ddd]"
                }`}
              >
                {type.name}
                <div className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
                  engine === type.name ? "border-[#e11d48] bg-[#e11d48]" : "border-[#ddd]"
                }`}>
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
          <p className="text-[#888] mb-3 text-sm">Что нужно сделать?</p>
          <div className="flex flex-col gap-2 mb-5">
            {[
              "Stage 1 (Увеличение мощности)",
              "Удаление экологии (EGR/DPF/САТ)",
              "Отключение мочевины (AdBlue)"
            ].map((goal) => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`min-h-[48px] w-full flex items-center justify-between px-4 border transition-colors text-sm font-semibold text-left ${
                  goals.includes(goal)
                    ? "border-[#e11d48] bg-[#fef2f2] text-[#111]"
                    : "border-[#eee] bg-white text-[#555] hover:border-[#ddd]"
                }`}
              >
                <span className="flex-1">{goal}</span>
                <div className={`w-5 h-5 border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                  goals.includes(goal) ? "bg-[#e11d48] border-[#e11d48]" : "border-[#ddd]"
                }`}>
                  {goals.includes(goal) && (
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
            className="w-full py-3 bg-[#111] hover:bg-[#333] disabled:bg-[#eee] disabled:text-[#aaa] text-white transition-colors flex items-center justify-center gap-2 text-sm font-bold"
          >
            Далее
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <p className="text-[#888] mb-3 text-sm">Ваш телефон</p>
          <div className="mb-4">
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+375 (XX) XXX-XX-XX"
              className="w-full min-h-[48px] bg-[#fafafa] border border-[#eee] px-4 text-sm font-semibold text-[#111] outline-none focus:border-[#e11d48] transition-colors placeholder:text-[#ccc]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#e11d48] hover:bg-[#be123c] disabled:bg-[#eee] disabled:text-[#aaa] text-white w-full py-3 font-bold transition-colors flex items-center justify-center gap-2 text-sm"
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
          {error && (
            <p className="text-sm text-center text-red-500 mt-3 font-medium">
              {error}
            </p>
          )}
          <p className="text-xs text-center text-[#ccc] mt-3">
            Перезвоним в течение 10 минут
          </p>
        </form>
      )}
      </div>
    </div>
  );
}
