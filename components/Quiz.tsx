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
    setTimeout(() => setStep(2), 250);
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
    <div className="bg-white rounded-2xl shadow-medium border border-slate-100 overflow-hidden animate-scale-in">
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  step >= i ? "bg-blue-500 w-8" : "bg-slate-100 w-6"
                }`}
              />
            ))}
          </div>
          <span className="text-slate-300 text-xs font-medium">{step}/3</span>
        </div>
        <h2 className="text-base font-bold text-slate-900">
          Узнать стоимость для <span className="text-blue-600">{model}</span>
        </h2>
      </div>

      <div className="p-6">

      {step === 1 && (
        <div className="animate-fade-in">
          <p className="text-slate-500 mb-4 text-sm font-medium">Какой тип двигателя?</p>
          <div className="flex flex-col gap-3">
            {[
              { name: "Бензин", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, color: "from-orange-400 to-red-500" },
              { name: "Дизель", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, color: "from-blue-400 to-indigo-500" }
            ].map((type) => (
              <button
                key={type.name}
                onClick={() => handleEngineSelect(type.name)}
                className={`min-h-[56px] w-full flex items-center gap-4 px-5 border-2 rounded-xl transition-all duration-300 text-sm font-semibold ${
                  engine === type.name
                    ? "border-blue-500 bg-blue-50 text-blue-700 shadow-brand"
                    : "border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50 active:scale-[0.98]"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center text-white shadow-md ${engine === type.name ? "scale-110" : ""} transition-transform`}>
                  {type.icon}
                </div>
                <span className="flex-1 text-left">{type.name}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${engine === type.name ? "border-blue-500 bg-blue-500 scale-110" : "border-slate-200"}`}>
                  {engine === type.name && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
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
        <div className="animate-fade-in">
          <p className="text-slate-500 mb-4 text-sm font-medium">Что нужно сделать?</p>
          <div className="flex flex-col gap-3 mb-6">
            {[
              { name: "Stage 1 (Увеличение мощности)", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, color: "from-amber-400 to-orange-500" },
              { name: "Удаление экологии (EGR/DPF/САТ)", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, color: "from-emerald-400 to-green-500" },
              { name: "Отключение мочевины (AdBlue)", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>, color: "from-blue-400 to-indigo-500" }
            ].map((goal) => (
              <button
                key={goal.name}
                onClick={() => toggleGoal(goal.name)}
                className={`min-h-[56px] w-full flex items-center gap-4 px-5 border-2 rounded-xl transition-all duration-300 text-sm font-semibold text-left ${
                  goals.includes(goal.name)
                    ? "border-blue-500 bg-blue-50 text-blue-700 shadow-brand"
                    : "border-slate-100 bg-white text-slate-600 hover:border-slate-200 hover:bg-slate-50 active:scale-[0.98]"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-white shadow-md ${goals.includes(goal.name) ? "scale-110" : ""} transition-transform`}>
                  {goal.icon}
                </div>
                <span className="flex-1">{goal.name}</span>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                  goals.includes(goal.name) ? "bg-blue-500 border-blue-500 scale-110" : "border-slate-200 bg-white"
                }`}>
                  {goals.includes(goal.name) && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
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
            className="w-full py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 disabled:from-slate-100 disabled:to-slate-100 disabled:text-slate-400 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold shadow-lg hover:shadow-xl disabled:shadow-none active:scale-[0.98]"
          >
            Далее
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="animate-fade-in">
          <p className="text-slate-500 mb-4 text-sm font-medium">Ваш телефон</p>
          <div className="mb-5">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+375 (XX) XXX-XX-XX"
                className="w-full min-h-[52px] bg-slate-50 border-2 border-slate-100 rounded-xl pl-12 pr-4 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:shadow-brand transition-all duration-300 placeholder:text-slate-300"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-slate-100 disabled:to-slate-100 disabled:text-slate-400 text-white w-full py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-brand hover:shadow-xl disabled:shadow-none active:scale-[0.98]"
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
          <p className="text-xs text-center text-slate-300 mt-4">
            Перезвоним в течение 10 минут
          </p>
        </form>
      )}
      </div>
    </div>
  );
}
