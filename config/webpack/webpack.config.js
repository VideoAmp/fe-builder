const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const PATHS = {
  DIST: path.resolve("dist"),
  SRC: path.resolve("src"),
};

const config = {
  context: PATHS.SRC,
  entry: './index.ts',
  output: {
    path: PATHS.DIST,
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              transpileOnly: true,
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(`${__dirname}/../../tsconfig.json`),
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  stats: {
      // suppress "export not found" warnings about re-exported types
      warningsFilter: /export .* was not found in/
  }
};

module.exports = config;
