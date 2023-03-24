const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const token = process.env.TOKEN;
const webAppUrl = 'https://visionary-frangipane-efddf1.netlify.app';

const bot = new TelegramBot(token, {polling: true});


const keyboardTwo = [
  [{
    text: 'Поехали !',
    web_app: { url: webAppUrl }
  }]
]

bot.onText(/\/start/, async (msg, [source, match]) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  const html = `
<strong>${firstName}</strong>

<i>Описание правил игры\nкак ей пользоваться...\nтут может быть текстовой блок ...</i>

<i>Игра доступна сегодня\n01.01.2023\nколичство попыток (ограничено)</i>

`
  await bot.sendMessage(chatId, html, {
    parse_mode: 'HTML'
  });
  await bot.sendSticker(chatId, './ref.webp')
  await bot.sendMessage(chatId, 'Желаем удачи в конкурсе и выйграть приз !', {
    reply_markup: {
      inline_keyboard: keyboardTwo
    }
  });
})

//ответ на кнопку в приложении
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (msg?.web_app_data?.data) {
    try {
      await bot.sendMessage(chatId, 'Обратная связь получена');
      const data = JSON.parse(msg?.web_app_data?.data)
      await bot.sendMessage(chatId, data);
    } catch (e) { }
  }
})
