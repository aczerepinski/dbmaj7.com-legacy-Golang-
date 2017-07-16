const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './static/source/js/app.js',
    output: {
        path: path.resolve(__dirname, 'static/dist/js'),
        filename: 'dbmaj7.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
}