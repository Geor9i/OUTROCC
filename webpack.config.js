const path = require('path')

module.exports= {
    mode: "development",
    entry : "./src/app.js",
    output : {
        path: path.resolve(__dirname, "dist", "public"),
        filename: "bundle.js"
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
          },
        ],
      },
    watch: true
}