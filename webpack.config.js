/*module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};*/

const path = require('path');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/typescript/tailwind.ts",
  },
  output: {
    //path: path.resolve(__dirname, './build'),
    path: path.resolve(__dirname, './public/js'),
    filename: "tailwind.js" // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     minimize: true,
  //     sourceMap: true,
  //     include: /\.min\.js$/,
  //   })
  // ],
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};