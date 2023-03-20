const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const token = process.env.TOKEN;
const webAppUrl = 'https://visionary-frangipane-efddf1.netlify.app';

const bot = new TelegramBot(token, {polling: true});


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
    else {
              await bot.sendMessage(5641035298,'Испытай удачу', {
        reply_markup: {
            inline_keyboard:[
                [{text: 'найди сертификат', web_app: {url: webAppUrl}}]
            ]
        }
  });
    };

});
