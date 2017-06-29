var path = require("path");

module.exports = {
  /*
   * app.ts represents the entry point to your web application. 
   * Everything included in this app.ts gets compiled and bundled 
   * into a single js bundle. Acts like a 'main' file.
   */
  entry: ["./src/app.ts"],

  // In the output we specify where to store the bundle and under what filename.
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    library: 'app'
  },

  /*
   * The resolve lets you specify the filetypes that you are going to use in your app.
   */
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js"] // " " extension is deprecated
  },

  devtool: 'source-map',

  module: {
    /*
     * Goes trough all files and checks trough regex if they
     * need to be loaded and if so it uses the loader specified.
     */
    loaders: [{ // this is the ts loader which uses the tsc compiler trough the tsconfig.
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
      // {
      //   test: /\.js$/, // if the files contains .js we use the compiler to compile to js 
      //   exclude: /node-modules/,
      //   loader: 'babel-loader'
      // },
      {
        test: /\.css$/, // if the files contains .css we use the compiler to compile to js 
        include: path.resolve(__dirname, "css"),
        exclude: /node-modules/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
};