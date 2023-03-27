const TelegramBot = require('node-telegram-bot-api');
//require('dotenv').config();
//const token = process.env.TOKEN;
const token = '5641035298:AAGRif1G1MXaWug4wED3j_D9KWePqwOmMlU';

const webAppUrl = 'https://visionary-frangipane-efddf1.netlify.app';

// const express = require('express');
// const cors = require('cors');

const bot = new TelegramBot(token, {polling: true});

// const app = express();
// app.use(express.json());
// app.use(cors());

const keyboardTwo = [
  [{
    text: 'Начать игру',
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
  await bot.sendSticker(chatId, './ref.webp', {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboardTwo
    }
  })
})

//ответ на кнопку в приложении
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (msg?.web_app_data?.data) {
    console.log(msg);
    try {
      await bot.sendMessage(chatId, `${msg.from.first_name}, сейчас мы ${msg.web_app_data.data}`);
    } catch (e) {
      await bot.sendMessage(chatId, 'что то пошло не так');
    }
  }
})

// app.post('/web-data', async (req,res)=>{
//   const {queryId, otvet} = req.body;
// try{
//   await bot.answerWebAppQuery(queryId, {
//     type: 'article',
//     id: queryId,
//     title: 'Успешно',
//     input_message_content: {message_text: 'текст пользователю !!! '+ otvet}
//   })
//   return res.status(200).json({});
// } catch(e) {
//   await bot.answerWebAppQuery(queryId, {
//     type: 'article',
//     id: queryId,
//     title: 'что то пошло не так',
//     input_message_content: {message_text: 'что то пошло не так 2'}
// })
// return res.status(500).json({});
// }

// })

// const PORT = 8000;
// app.listen(PORT, ()=> console.log('server Start '+ PORT));

