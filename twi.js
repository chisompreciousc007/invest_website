// require("dotenv/config");
// console.log("twilio running");
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const autheToken = process.env.TWILIO_AUTHE_TOKEN;
// const client = require("twilio")(accountSid, autheToken);

// client.messages
//   .create({
//     body: "this is a text message",
//     from: "+12059646173",
//     to: "+2348036734191",
//   })
//   .then((message) => console.log(message))
//   .catch((err) => console.log(err));

// const Nexmo = require("nexmo");

// const nexmo = new Nexmo({
//   apiKey: "ad5dccdb",
//   apiSecret: "US7Grx0EyAMDfqKI",
// });

// const from = "splashcash";
// const to = "2349060727085";
// const text = "Hello from Vonage SMS API";

// nexmo.message.sendSms(from, to, text);

// const { Telegraf } = require("telegraf");

// const bot = new Telegraf("1305066920:AAEcJ5MEM2SNDnb-82ypWLcYCPFe7twyt4c");
// bot.start((ctx) => ctx.reply("Welcome"));
// bot.help((ctx) => ctx.reply("Send me a sticker"));
// bot.on("sticker", (ctx) => ctx.reply("👍"));
// bot.hears("hi", (ctx) => ctx.reply("Hey there"));
// bot.launch();

// const { TelegramClient } = require("messaging-api-telegram");

// // get accessToken from telegram [@BotFather](https://telegram.me/BotFather)
// const client = new TelegramClient({
//   accessToken: "1305066920:AAEcJ5MEM2SNDnb-82ypWLcYCPFe7twyt4c",
// });
// const test = async () => {
//   const res = await client.sendMessage("@splash_cash247", "hi", {
//     disableWebPagePreview: true,
//     disableNotification: true,
//   });
//   console.log(res);
// };

// test();
