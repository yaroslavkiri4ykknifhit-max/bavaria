"use client";

import { useState } from "react";

type ReviewCardProps = {
  name: string;
  suffix?: string;
  car: string;
  text: string;
  date: string;
};

export default function ReviewCard({ name, suffix, car, text, date }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncate = text.length > 150;
  const displayText = expanded || !needsTruncate ? text : text.slice(0, 150) + "…";

  return (
    <div className="bg-[#fafafa] border border-[#eee] p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-[#111] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-[#111]">
            {name}{suffix ? `, ${suffix}` : ""}
          </div>
          <div className="text-xs text-[#e11d48] font-bold mt-0.5">{car}</div>
        </div>
        <div className="text-xs text-[#ccc] flex-shrink-0">{date}</div>
      </div>
      <p className="text-sm text-[#555] leading-relaxed">{displayText}</p>
      {needsTruncate && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-[#e11d48] font-bold mt-2 hover:underline"
        >
          {expanded ? "Свернуть" : "Читать полностью"}
        </button>
      )}
    </div>
  );
}
