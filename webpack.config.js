const HtmlWebPackPlugin = require("html-webpack-plugin");
const {resolve} = require('path');
module.exports = {
    entry: './index.js',
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: resolve(__dirname, 'public', 'index.html'),
            filename: "./index.html"
        })
    ]
};
