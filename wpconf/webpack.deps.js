// use with browser, includes deps

module.exports = {
  output: {
    path: require('path').resolve(__dirname, '../dist'),
    library: 'RiTa',
    filename: 'rita.js',
    globalObject: 'this',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  resolve: {
    fallback: { "fs": false }
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  watchOptions: {
    ignored: /node_modules/
  },
  entry: './src/rita.js',
  plugins: [
    new (require('webpack').DefinePlugin)({
      __VERSION__: JSON.stringify(require("../package.json").version)
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  optimization: {
    minimize: true,
    minimizer: [
      new (require('terser-webpack-plugin'))({ // v.2.3.8
        terserOptions: { output: { ascii_only: true } },
        extractComments: false
      })
    ],
  }
};
