const path = require('path');
const {　VueLoaderPlugin} = require('vue-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = [
  {
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'script.js'
    },
    module: {
      rules: [
        // js
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        // vue
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        // scss
        {
          test: /\.(scss|css)/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: true,
                importLoaders: 2
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // PostCSS側でもソースマップを有効にする
                sourceMap: true,
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  require('autoprefixer')({
                    grid: true
                  })
                ]
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                // data: '@import 'style.scss';',
                // includePaths: path.resolve(__dirname, './stylesheet/style.scss'),
              }
            }

          ]
        },
        // pug
        {
          test: /\.pug$/,
          oneOf: [{
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader']
            },
            {
              use: ['raw-loader', 'pug-plain-loader']
            }
          ]
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json', '.scss']
    },
    devtool: 'source-map',
    devServer: {
      //webpack-dev-server用設定
      open: true, //ブラウザを自動で開く
      openPage: './index.html', //自動で指定したページを開く
      contentBase: path.join(__dirname, './dist'), // HTML等コンテンツのルートディレクトリ
      watchContentBase: true, //コンテンツの変更監視をする
      port: 3000, // ポート番号
    },
    performance: {
      hints: false
    },
    plugins: [
      new HardSourceWebpackPlugin(),
      new VueLoaderPlugin()
    ]
  },
  {
    mode: 'production',
    entry:{
      bundle:'./src/stylesheet/style.scss'
    },
    output:{
      path: path.join(__dirname, 'dist'),
      filename: 'style.css'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract(
            {
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            }
          )
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('style.css')
    ]
  }
]
