const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');

const pluginsConfig = [new VueLoaderPlugin()];

module.exports = () => {
  return {
    entry: './src/main/client/main.js',
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loader: '@kazupon/vue-i18n-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                fiber: require('fibers'),
              }
            }
          ]
        }
      ]
    },
    plugins: pluginsConfig,
    devtool: 'cheap-module-eval-source-map',
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, './build'),
      filename: 'main.js'
    },
    performance: {
      hints: false
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: [
        '*',
        '.js',
        '.vue',
        '.json'
      ]
    }
  }
};
