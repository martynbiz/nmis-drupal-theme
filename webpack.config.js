const path = require('path');

module.exports = {
    entry: {
        "react": './assets/js/react.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/js')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }],
    },
    mode: 'development',
    devtool: 'inline-source-map'
}
