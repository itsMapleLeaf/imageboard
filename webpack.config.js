const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

const sourcePath = 'src'
const outPath = 'out'

module.exports = function (env = {}) {
  return {
    entry: `./${sourcePath}/main.js`,
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, outPath),
      publicPath: '/'
    },
    module: {
      rules: [
        { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
        { test: /\.(png|jpg)$/, use: 'file-loader' },
        { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new HtmlPlugin({ template: `./${sourcePath}/index.html` })
    ],
    devtool: 'source-map'
  }
}
