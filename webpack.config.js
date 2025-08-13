const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 1. Импортируем плагин

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/', // 2. Указываем публичный путь для всех ассетов
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false, // 3. Отключаем обработку url() в css-loader
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CopyWebpackPlugin({ // 4. Настраиваем плагин для копирования
      patterns: [
        { from: 'public', to: '.', globOptions: { ignore: ['**/index.html'] } }, // Копируем всё из public в корень dist, кроме index.html
      ],
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true, // Важно для React Router, если будете использовать
  },

  mode: 'development',
};
