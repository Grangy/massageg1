// webhook.js

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config({ path: './.env.local' });
// eslint-disable-next-line @typescript-eslint/no-require-imports
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Telegraf } = require('telegraf');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs/promises');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

const app = express();
app.use(express.json());

// Путь к файлу orders.json (на одном уровне с webhook.js)
const ordersFilePath = path.join(__dirname, 'orders.json');

// Получаем переменные окружения из .env.local
const telegramToken = process.env.TELEGRAM_TOKEN;
const group1 = process.env.TELEGRAM_GROUP1;
const group2 = process.env.TELEGRAM_GROUP2;
const PORT = process.env.PORT || 4464;

if (!telegramToken || !group1 || !group2) {
  console.error('Отсутствуют необходимые переменные окружения');
  process.exit(1);
}

// Инициализируем Telegraf-бота
const bot = new Telegraf(telegramToken);

// Функция для чтения заказов из файла
async function readOrders() {
  try {
    const data = await fs.readFile(ordersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Ошибка чтения orders.json:', error);
    return [];
  }
}

// Функция для записи заказов в файл
async function writeOrders(orders) {
  try {
    await fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2));
  } catch (error) {
    console.error('Ошибка записи в orders.json:', error);
  }
}

app.post('/api/webhook', async (req, res) => {
  try {
    const { name, phone, date, massage } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Неверные данные' });
    }

    // Создаём уникальный идентификатор заказа
    const orderId = Date.now();
    const newOrder = {
      id: orderId,
      name,
      phone,
      date: date || null, // Если date не передан, будет null
      massage: massage || '',
      createdAt: new Date().toISOString(),
      taken: false
    };

    // Читаем текущие заказы, добавляем новый и сохраняем
    let orders = await readOrders();
    orders.push(newOrder);
    await writeOrders(orders);

    console.log(`Новый заказ получен: ${orderId}`);

    // Формируем сообщение для первой группы с кнопкой "Взять заказ"
    let messageGroup1 = `Новая заявка на массаж:
Имя: ${name}
Телефон: ${phone}`;
    if (date) {
      messageGroup1 += `\nДата: ${date}`;
    }
    if (massage) {
      messageGroup1 += `\nМассаж: ${massage}`;
    }
    messageGroup1 += `\n\nЕсли вы не возьмете заявку в течение 20 минут, она будет автоматически отправлена в группу Пармастеры.`;

    const inlineKeyboard = {
      inline_keyboard: [
        [{ text: 'Взять заказ', callback_data: `take_order_${orderId}` }]
      ]
    };

    // Отправляем сообщение в группу 1
    await bot.telegram.sendMessage(group1, messageGroup1, {
      reply_markup: inlineKeyboard
    });
    console.log(`Сообщение отправлено в группу1 для заказа ${orderId}`);

    // Запускаем таймер на 12 минут (720000 мс) для проверки состояния заказа
    setTimeout(async () => {
      let orders = await readOrders();
      const order = orders.find(o => o.id === orderId);
      if (order && !order.taken) {
        let messageGroup2 = `Новая заявка на массаж:
Имя: ${order.name}
Телефон: ${order.phone}`;
        if (order.date) {
          messageGroup2 += `\nДата: ${order.date}`;
        }
        if (order.massage) {
          messageGroup2 += `\nМассаж: ${order.massage}`;
        }

        // Добавляем inline-кнопку "Взять заказ" для группы 2
        const inlineKeyboardGroup2 = {
          inline_keyboard: [
            [{ text: 'Взять заказ', callback_data: `take_order_${orderId}` }]
          ]
        };

        await bot.telegram.sendMessage(group2, messageGroup2, {
          reply_markup: inlineKeyboardGroup2
        });
        // Обновляем статус заказа: помечаем как forwarded
        order.forwarded = true;
        await writeOrders(orders);
        console.log(`Заказ ${orderId} не был взят, перенаправлен в группу2.`);
      }
    }, 720000); // 12 минут

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка в /api/webhook:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

bot.on('callback_query', async (ctx) => {
  try {
    const callbackData = ctx.callbackQuery.data;
    console.log('Получен callback:', callbackData);

    if (callbackData.startsWith('take_order_')) {
      const orderId = Number(callbackData.split('_')[2]);
      let orders = await readOrders();
      const order = orders.find(o => o.id === orderId);

      if (!order) {
        await ctx.answerCbQuery('Заказ не найден.');
        console.log(`Заказ ${orderId} не найден.`);
        return;
      }

      if (order.taken) {
        await ctx.answerCbQuery('Заказ уже был принят.');
        console.log(`Заказ ${orderId} уже принят ранее.`);
        return;
      }

      // Помечаем заказ как принятый и сохраняем информацию о пользователе
      order.taken = true;
      order.takenBy = {
        id: ctx.from.id,
        firstName: ctx.from.first_name,
        username: ctx.from.username
      };
      await writeOrders(orders);

      // Получаем данные пользователя, принявшего заказ
      const firstName = ctx.from.first_name;
      const username = ctx.from.username ? `@${ctx.from.username}` : '';

      // Формируем обновленный текст сообщения
      const updatedText = `Новая заявка на массаж:
Имя: ${order.name}
Телефон: ${order.phone}
Дата: ${order.date}
${order.massage ? `Массаж: ${order.massage}` : ''}

**Заказ принят пользователем:** ${firstName} ${username}`;

      // Обновляем сообщение с новой кнопкой
      await ctx.editMessageText(updatedText, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [{ text: `Заказ принят ✅ ${firstName} ${username}`, callback_data: 'order_taken' }]
          ]
        }
      });

      await ctx.answerCbQuery('Заказ принят!');
      console.log(`Заказ ${orderId} принят пользователем ${ctx.from.id} ${username}`);
    }
  } catch (error) {
    console.error('Ошибка в обработчике callback_query:', error);
  }
});
  
  

// Запускаем Telegraf-бота
bot.launch()
  .then(() => console.log('Telegraf бот запущен.'))
  .catch(err => console.error('Ошибка запуска бота:', err));

// Запускаем Express-сервер
app.listen(PORT, () => {
  console.log(`Webhook сервер запущен на порту ${PORT}`);
});
