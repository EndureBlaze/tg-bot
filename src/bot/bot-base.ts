import { Telegraf } from 'telegraf'

const useBaseBot = (bot: Telegraf) => {
  bot.start((ctx) =>
    ctx.reply(
      '欢迎使用 Kirby Assistant Bot!\n可以访问 https://kirby.ga 使用网页版\n使用 /help 查看帮助'
    )
  )

  bot.help((ctx) => {
    ctx.reply('发送 /game 获取所有的游戏列表')
    ctx.reply('发送 /emu 获取模拟器列表')
  })
}

export { useBaseBot }
