const ForkTsCheckerWebpackPlugin = require.resolve('fork-ts-checker-webpack-plugin');
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
        use: require.resolve("ts-loader"),
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
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
