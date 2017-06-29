import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  //debug: true,
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'src/index.ts')
  ],
  target: 'web', //can be node or electron etc.
  output: { // webpack wont create a physical file, it will serve our build from memory
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      "node_modules",
      path.resolve(__dirname)
    ],
  },
  module: {
    /*
     * Goes trough all files and checks trough regex if they
     * need to be loaded and if so it uses the loader specified.
     */
    loaders: [{ // this is the ts loader which uses the tsc compiler trough the tsconfig.
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: [/node_modules/, /typings/]
      },
      {
        test: /\.js$/, // if the files contains .js we use the compiler to compile to js
        exclude: /node-modules/,
        loader: 'babel-loader',
        query: {compact: false} // some of the node modules excede 500kb and this is the way not to make babel compress them
      },
      {
        test: /\.css$/, // if the files contains .css we use the compiler to compile to js
        include: path.resolve(__dirname, "css"),
        exclude: /node-modules/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}
