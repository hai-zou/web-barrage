const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
                    // 开发环境下使用 style-loader
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({ filename: 'barrage.css' })
    ],
}