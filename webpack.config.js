const HtmlWebPackPlugin = require("html-webpack-plugin");
const {resolve} = require('path');
module.exports = {
    entry: resolve(__dirname, 'src', 'index.js'),
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'build.js',
        publicPath: '/'
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
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: resolve(__dirname, 'public', 'index.html'),
            filename: "./index.html"
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            Actions: resolve(__dirname, 'src/js/actions'),
            Components: resolve(__dirname, 'src/js/components'),
            Constants: resolve(__dirname, 'src/js/constants'),
            Containers: resolve(__dirname, 'src/js/containers'),
            Reducers: resolve(__dirname, 'src/js/reducers'),
            Redux: resolve(__dirname, 'src/js/redux'),
            Utils: resolve(__dirname, 'src/js/utils'),
        }
    },
    devServer: {
        historyApiFallback: true,
    },
};
