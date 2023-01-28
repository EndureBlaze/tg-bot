import path from 'path'
import { Configuration } from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { DefinePlugin } from 'webpack'
import dotenv from 'dotenv'

dotenv.config()

const isDevMode = process.env.NODE_ENV !== 'production'

const config: Configuration = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  stats: 'errors-only',
  output: {
    clean: true,
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          happyPackMode: !isDevMode,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new DefinePlugin({
      'process.env.TOKEN': JSON.stringify(process.env.TOKEN),
    }),
  ],
}

export default config
