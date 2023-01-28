import { Markup, Telegraf } from 'telegraf'
import { fmt, code, link, bold } from 'telegraf/format'
import { IGame } from '../types'
import { consoleList, gameList } from '../service/ka.service'

const useKirbyAssistantBot = (bot: Telegraf) => {
  bot.command('game', async (ctx) => {
    const _consoleList = await consoleList()

    console.log(_consoleList)

    const consoleKeys: any[] = []

    _consoleList.forEach((console) => {
      consoleKeys.push(
        Markup.button.callback(console.title, `ka-${console.tag}`)
      )
    })

    ctx.reply(
      '请选择平台',
      Markup.inlineKeyboard([...consoleKeys], {
        wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2,
      })
    )
  })

  bot.command('emu', (ctx) => {
    const title = fmt('提取码均为 ', code('kirby'))
    const android = link(
      'Android 手机使用',
      'https://wwe.lanzouo.com/b01uucqgb'
    )
    const windows = link(
      'Windows 电脑使用',
      'https://wwe.lanzouo.com/b01uucqid'
    )

    ctx.reply(fmt`${title}\n\n${android}\n${windows}`)
  })

  bot.action(/(ka-)(.*)/, async (ctx) => {
    const consoleOrGame = ctx.match?.[2]

    if (
      (await consoleList()).find((console) => console.tag === consoleOrGame)
    ) {
      const gameKeys: any[] = []

      ;(await gameList(consoleOrGame)).forEach((game: IGame) => {
        gameKeys.push(Markup.button.callback(game.title, `ka-${game.title}`))
      })

      ctx.editMessageText(
        '请选择游戏',
        Markup.inlineKeyboard([...gameKeys], {
          wrap: (_, index, currentRow) => currentRow.length >= (index + 1) / 2,
        })
      )
    } else {
      console.log(ctx.match)
      const game = (await gameList(consoleOrGame, true)).find(
        (game) => game.title === consoleOrGame
      )
      console.log(game)

      const links: { name: string; link: string }[] = []

      if (game?.download_link) {
        Object.keys(game.download_link).forEach((version, index) => {
          links.push({
            name: version,
            link: Object.values<string>(game.download_link)[index],
          })
        })
      }

      ctx.deleteMessage()

      ctx.reply(
        fmt`${bold(`${game?.title} 下载链接`)}\n\n${links
          .map((link) => getVersionName(link.name) + ': ' + link.link)
          .join('\n')}`,
        { disable_web_page_preview: true }
      )
    }
  })
}

const getVersionName = (version: string) => {
  switch (version) {
    case 'jp':
      return '日版'
    case 'us':
      return '美版'
    case 'cn':
      return '汉化版'
    default:
      return version
  }
}

export { useKirbyAssistantBot }
