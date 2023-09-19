const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/barrage.ts',
    output: {
        filename: 'barrage.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
    },

    resolve: {
        extensions: ['.ts', '.js', '.css']
    },

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({ filename: 'barrage.css' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './data.json', to: 'data.json' }
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
            scriptLoading: 'blocking'
        }),
    ],
}