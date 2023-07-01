const path = require("path");

module.exports = {
  entry: {
    "worker-storage": path.resolve(__dirname, "./src/index.ts"),
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./lib/"),
    filename: "[name].js",
    library: "workerStorage",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
  mode: "production",
};
