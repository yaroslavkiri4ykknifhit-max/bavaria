import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, engine, goals, phone } = body;

    if (!model || !engine || !goals?.length || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Сохраняем лид в Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error: dbError } = await supabase.from("leads").insert({
      model,
      engine,
      goals,
      phone,
    });

    if (dbError) {
      console.error("Supabase error:", dbError);
    }

    // 2. Отправляем уведомление в Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const message = [
        `🏎 *Новая заявка — Bavaria Performance*`,
        ``,
        `*Модель:* ${model.toUpperCase()}`,
        `*Двигатель:* ${engine}`,
        `*Услуги:* ${goals.join(", ")}`,
        `*Телефон:* ${phone}`,
        ``,
        `_${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}_`,
      ].join("\n");

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
