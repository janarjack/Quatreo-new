const webpack = require("webpack");

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            $ENV : {
                END_URL : JSON.stringify(process.env.END_URL),
                CLIENT_ID : JSON.stringify(process.env.CLIENT_ID),
                CLIENT_SECRET : JSON.stringify(process.env.CLIENT_SECRET)
            }
        })
    ]
}
