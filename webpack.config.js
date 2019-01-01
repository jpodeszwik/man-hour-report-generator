const path = require('path');
const StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  externals: {
    fs: "commonjs fs",
    path: "commonjs path",
  },
  module: {
    rules: [
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      // workarounds for pdfkit so that it does not throw an exception during initialization
      // based on https://github.com/bpampuch/pdfmake/blob/master/webpack.config.js
      {
        test: /pdfkit[/\\]js[/\\]/, loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: 'return this.font(\'Helvetica\');',
              replacement: function () {
                return '';
              }
            }
          ]
        })
      },
      {
        test: /fontkit[/\\]index.js$/, loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /fs\./g,
              replacement: function () {
                return 'require(\'fs\').';
              }
            }
          ]
        })
      },
      { enforce: 'post', test: /fontkit[/\\]index.js$/, loader: "transform-loader?brfs" },
      { enforce: 'post', test: /unicode-properties[/\\]index.js$/, loader: "transform-loader?brfs" },
      { enforce: 'post', test: /linebreak[/\\]src[/\\]linebreaker.js/, loader: "transform-loader?brfs" }
    ],
  },
};
