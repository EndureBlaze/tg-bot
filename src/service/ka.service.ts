import { IConsole, IGame } from '../types'

const _consoleList: Array<IConsole> = []
const _gameMap: Map<string, Array<IGame>> = new Map()
let _lastGameList: Array<IGame> = []

const consoleList = async () => {
  if (_consoleList.length === 0) {
    return await fetch('https://api.imyan.ren/ka/data/console.json').then(
      async (res) => {
        const data = await res.json()
        _consoleList.push(...data)
        return data as Array<IConsole>
      }
    )
  } else {
    return _consoleList
  }
}

const gameList = async (consoleTag: string, gameMode = false) => {
  if (gameMode) {
    return Array.from(_gameMap.values())
      .flat()
      .filter((ele) => ele.title === consoleTag)
  }
  if (_gameMap.get(consoleTag) === undefined) {
    return await fetch(
      `https://api.imyan.ren/ka/data/console/${consoleTag}.json`
    ).then(async (res) => {
      const data = await res.json()
      _lastGameList = []
      _lastGameList.push(...data)
      _gameMap.set(consoleTag, data)
      return data as Array<IGame>
    })
  } else {
    return _gameMap.get(consoleTag) as Array<IGame>
  }
}

export { consoleList, gameList, _lastGameList as lastGameList }
