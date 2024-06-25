const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const PACKAGE_ROOT_PATH = process.cwd(),
  SRC = path.resolve(PACKAGE_ROOT_PATH, "./src"),
  DIST = path.resolve(PACKAGE_ROOT_PATH, "./dist"),
  PUBLIC = path.resolve(PACKAGE_ROOT_PATH, "./public"),
  INDEX_HTML = path.resolve(PACKAGE_ROOT_PATH, "./public/index.html");

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "AINEXIM PWA",
      template: INDEX_HTML,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: PUBLIC,
          to: DIST,
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
};
