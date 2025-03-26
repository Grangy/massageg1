// app/api/book-appointment/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, date } = body;

    // Проверяем только name и phone, date теперь необязательно
    if (!name || !phone) {
      return NextResponse.json({ error: 'Неверные данные: имя и телефон обязательны' }, { status: 400 });
    }

    // Формируем URL вебхука с полным указанием протокола и хоста
    const webhookUrl = 'http://127.0.0.1:4464/api/webhook';

    // Пересылаем данные на вебхук, включая date, если оно есть
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, date }), // date может быть undefined
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке данных на вебхук');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}