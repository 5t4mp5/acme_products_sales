module.exports = {
    entry: "./client/index.js",
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    context: __dirname,
    devtool: "source-maps ",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            }
        ]
    }
}