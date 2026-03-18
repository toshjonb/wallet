const TelegramBot = require("node-telegram-bot-api")
const pool = require("./db")

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling:true })

// START
bot.onText(/\/start/, (msg)=>{
  bot.sendMessage(msg.chat.id, "👋 SMART HAMYON botga xush kelibsiz")
})

// BALANCE
bot.onText(/\/balance/, async (msg)=>{
  const userId = msg.chat.id

  const data = await pool.query(
    "SELECT * FROM balances WHERE user_id=$1",[userId]
  )

  if(data.rows.length==0){
    return bot.sendMessage(msg.chat.id,"Balans yo‘q")
  }

  let text = "💰 Sizning balans:\n"
  data.rows.forEach(b=>{
    text += `${b.currency}: ${b.amount}\n`
  })

  bot.sendMessage(msg.chat.id,text)
})

// DEPOSIT
bot.onText(/\/deposit/, (msg)=>{
  bot.sendMessage(msg.chat.id,"💳 Depozit uchun admin bilan bog‘laning")
})

console.log("BOT RUNNING")
