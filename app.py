"import telebot"

TOKEN = "8408970947:AAGpr02DmqXHOOmw3htXz0Uq9srW-sG0cHU"
bot = "telebot.TeleBot(TOKEN)"

@bot.message_handler(func=lambda message: True)
def echo_all(message):
    bot.reply_to(message, f"Siz yozdingiz: {message.text}")

bot.polling()