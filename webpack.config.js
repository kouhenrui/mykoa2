const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const webpackConfig = {
  entry: './src/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.join(__dirname, 'src') // 设置别名指向对应目录
    }
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  watch: true


  // plugins: [
  //   new WebpackShellPluginNext({
  //     onBuildEnd: {
  //       scripts: ['node dist/index.js'],
  //       blocking: false,
  //       parallel: true
  //     }
  //   })
  // ]
};

module.exports = webpackConfig;

// import { resolve as _resolve } from 'path';
// import nodeExternals from 'webpack-node-externals';
// export const entry = './src/index.js';
// export const target = 'node';
// export const externals = [nodeExternals()];
// export const output = {
//   path: _resolve(__dirname, 'dist'),
//   filename: 'bundle.js'
// };
// export const module = {
//   rules: [
//     {
//       test: /\.js$/,
//       exclude: /node_modules/,
//       use: {
//         loader: 'babel-loader'
//       }
//     }
//   ]
// };
// export const mode = process.env || "production";
// export const watch = true;
// export const resolve = {
//   extensions: ['.js']
// };
// module.exports = (env, argv) => {
//   const mode = argv.mode || 'production';

//   return {
//     entry: './src/index.js',
//     target: 'node',
//     externals: [nodeExternals()],
//     output: {
//       path: path.resolve(__dirname, 'dist'),
//       filename: 'bundle.js'
//     },
//     module: {
//       rules: [
//         {
//           test: /\.js$/,
//           exclude: /node_modules/,
//           use: {
//             loader: 'babel-loader'
//           }
//         }
//       ]
//     },
//     resolve: {
//       extensions: ['.js']
//     },
//     mode: mode,
//     watch: mode === 'development'
//   };
// };

