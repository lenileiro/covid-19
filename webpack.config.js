var path = require('path')
var nodeExternals = require('webpack-node-externals')
build =  {
    entry: './app/src/index.js',
    mode: 'production',
    output: {
      path: path.resolve(__dirname, './public'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          use: ['babel-loader']
        }
      ]
    }
  }

  var server = {
    entry: './app/index.js',
    target: 'node',
    mode: 'production',
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, 'functions'),
      filename: 'index.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    }
  }
module.exports = [build, server] 
