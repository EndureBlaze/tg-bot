import { Telegraf } from 'telegraf'
import { useBaseBot } from './bot/bot-base'
import { useKirbyAssistantBot } from './bot/bot-ka'

const bot = new Telegraf(
  process.env.TOKEN ?? '5197773761:AAEEj5RYk4GfRTjPLEFtIbt9AP70046bNs8'
)

useBaseBot(bot)
useKirbyAssistantBot(bot)

bot.launch()

console.log('bot start')
