const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader/url"},
          {loader: "file-loader"}
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/index.html",
      filename: "./index.html"
    })
  ]
};
