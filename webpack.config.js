import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
const __dirname = import.meta.dirname;

export default {
  entry: {
    index: ["./src/index.js"],
    "wip/index": ["./src/wip/index.js"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/wip/index.html",
      filename: "wip/index.html",
      chunks: ["wip/index"],
    }),
  ],
};
