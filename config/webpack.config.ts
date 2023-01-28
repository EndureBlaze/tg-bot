import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import baseConfig from './webpac.base.config'
import NodemonPlugin from 'nodemon-webpack-plugin'

const config: Configuration = {
  mode: 'none',
  plugins: [new NodemonPlugin()],
}

export default merge(baseConfig, config)
