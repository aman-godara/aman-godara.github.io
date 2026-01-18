import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackPartialsPlugin from "html-webpack-partials-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = import.meta.dirname;

export default {
  entry: {
    index: ["./src/index.js"],
    "wip/index": ["./src/wip/index.js"],
    "dev-journal/index": ["./src/dev-journal/index.js"],
    "partials/navbar": ["./src/partials/navbar/navbar.js"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["partials/navbar", "index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/wip/index.html",
      filename: "wip/index.html",
      chunks: ["partials/navbar", "wip/index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/dev-journal/index.html",
      filename: "dev-journal/index.html",
      chunks: ["partials/navbar", "dev-journal/index"],
    }),
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/navbar/navbar.html'),
        location: 'body',
        priority: 'high',
        template_filename: ['index.html', 'wip/index.html', 'dev-journal/index.html']
      }
    ]),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "public" }],
    }),
  ],
};
