const TelegramBot = require('node-telegram-bot-api');
//подключаем сервер
const express = require('express');
const cors = require('cors');

const token = '5641035298:AAGRif1G1MXaWug4wED3j_D9KWePqwOmMlU';
const webAppUrl = 'https://visionary-frangipane-efddf1.netlify.app';

const bot = new TelegramBot(token, {polling: true});
//для работы сервера
const app = express();
app.use(express.json());
app.use(cors());

bot.on('message', async(msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

  if(text === '/start'){
    //если написал Старт - создание кнопки inline
    await bot.sendMessage(chatId,'Испытай удачу', {
        reply_markup: {
            inline_keyboard:[
                [{text: 'найди сертификат', web_app: {url: webAppUrl}}]
            ]
        }
    });
  } else {
    await bot.sendMessage(chatId,"используйте команду /start")
  };
      
});


//http ручка
app.post('/web-data', async (req, res) => {
  const {queryId, userName, otvet} = req.body;
  try {
    await bot.answerWebAppQuery(queryId,{
      type: 'article',
      id: queryId,
      title: 'Успешное завершение',
      input_message_content: {message_text: 'Поздравляем '+ userName + otvet}
    })
    return res.status(200).json({});
  }catch(e){
    return res.status(500).json({})
    }
});

// запускаем сервер
const PORT = 8000;
app.listen(PORT, () => console.log('server start on PORT '+ PORT));
