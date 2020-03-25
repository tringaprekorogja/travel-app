const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    mode:'production',
    entry: './src/client/index.js',
    output: {
       libraryTarget:'var',
       library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            }
            

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/client/views/index.html',
            filename:'./index.html'
        })
    ]

};