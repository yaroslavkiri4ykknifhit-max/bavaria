import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { model, engine, goals, phone } = body;

    if (!model || !engine || !goals || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ error: "Telegram not configured" }, { status: 500 });
    }

    const message = [
      `🏎 *Новая заявка - Bavaria Performance*`,
      ``,
      `*Модель:* ${model}`,
      `*Двигатель:* ${engine}`,
      `*Услуги:* ${goals.join(", ")}`,
      `*Телефон:* ${phone}`,
      ``,
      `_${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Minsk" })}_`,
    ].join("\n");

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
