const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    publicPath: "/assets",
    filename: "bundle.js",
    environment: {
      arrowFunction: false,
    },
  },
  devServer: {
    static: path.join(__dirname, "dist"),
  },
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // Array of presets
            presets: [
              // Each preset is an array with an string with it's name and an
              // object with it's configuration
              [
                "@babel/preset-env",
                //
                {
                  // TODO: specify browser targets/support with a browserlist
                  // integration
                  // targets: {
                  //   chrome: "31",
                  // },

                  // These settings are necessary to inject necessary polyfills
                  useBuiltIns: "usage",
                  corejs: "3.24",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        // Order matters, loaders are executed from right to left
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
