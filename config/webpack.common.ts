import * as Path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';
import { ProvidePlugin } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { AssetList } from '../src/assetList';

const appDir = Path.dirname(__dirname);

module.exports = {
  mode: 'none',
  entry: {
    'src/component/web/gamivo/product/content': './src/component/web/gamivo/product/content.ts',
    'src/component/web/gamivo/search/content': './src/component/web/gamivo/search/content.ts',
    'src/component/web/ggdeals/product/content': './src/component/web/ggdeals/product/content.ts',
    'src/component/web/ggdeals/search/content': './src/component/web/ggdeals/search/content.ts',
    'src/component/web/yuplay/product/content': './src/component/web/yuplay/product/content.ts',
    'src/component/web/yuplay/search/content': './src/component/web/yuplay/search/content.ts',
    'src/component/web/humbleBundle/product/content': './src/component/web/humbleBundle/product/content.ts',
    'src/component/web/humbleBundle/search/content': './src/component/web/humbleBundle/search/content.ts'
  },
  output: {
    path: Path.join(appDir, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'image/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: process.env.NODE_ENV !== 'production'
            }
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json5-loader',
        options: {
          esModule: false
        },
        type: 'javascript/auto'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss', 'json'],
    modules: [
      Path.resolve(appDir, 'src'),
      Path.resolve(appDir, 'node_modules')
    ],
    alias: {
      src: Path.resolve(appDir, 'src/')
    }
  },
  target: 'web',
  plugins: [
    new ProvidePlugin({
      process: 'process/browser'
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx']
    }),
    new MiniCssExtractPlugin({
      filename: ({ chunk }) => {
        console.log('[webpack-debug] css.chunk.name=' + chunk!.name);
        const regexp = /content$/;
        const replace = 'style.css';
        if (chunk!.name!.match(regexp)) {
          return chunk!.name!.replace(regexp, replace);
        }
        return '[name].css';
      }
    }),
    new CopyWebpackPlugin({
      patterns: AssetList
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()]
  }
};
