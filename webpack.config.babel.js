import path from 'path';
import webpack from 'webpack';


export default function ({
  watch = true,
  sourcemaps = false,
  debug = false,
}) {
  return {
    watch,
    bail: false,
    profile: true,
    output: {
      filename: 'app.min.js',
      sourceMapFilename: '[file].map',
      pathinfo: false,
    },

    devtool: (sourcemaps || !debug) ? 'source-map' : 'eval',

    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['eslint-loader'],
          include: [path.resolve(__dirname, 'src')],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
          include: path.join(__dirname, 'src'),
        },
        {
          test: /\.json$/,
          use: ['json-loader'],
        },
      ],
    },

    resolve: {
      extensions: ['.js'],
      modules: [
        path.join(__dirname, 'node_modules'),
      ],
    },

    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
    ].concat(debug ? [
      new webpack.HotModuleReplacementPlugin(),
    ] : [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      }),
    ]),
  };
}
