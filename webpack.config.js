const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    bundle: './src/index.tsx',
    background: './src/scripts/background.ts',
    content: './src/scripts/content.ts'
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.bundle\.ts$/,
        use: {
            loader: 'bundle-loader',
            options: {
                name: '[name]'
            }
        }
      },
      {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
      },
      {
          test: /\.(svg|png|gif|jpg)$/,
          exclude: /fonts/,
          loader: 'file-loader'
      },
      {
          test: /\.(ttf|eot|woff|svg|woff2)$/,
          loader: "file-loader"
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public'}
      ]
    })
  ],
  watch: true
}