const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    // define entry file and output
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    // define loaders
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader",
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "public", "index.html"),
          manifest: path.resolve(__dirname, "public", "manifest.json"),
        }),
      ],
};