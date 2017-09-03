const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');

const minifyHTML = (env) => {
    if (env === 'production') {
        return {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        };
    }

    return false;
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        index: ['./js/index.js', './scss/main.scss']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: path.join('js', '[name].[chunkhash].js')
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                },
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'style-loader',
                        'css-loader?sourceMap'
                    ]
                })
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?sourceMap',
                        'sass-loader?sourceMap'
                    ]
                })
            },
            {
                test: /\.(woff2?|ttf|eot|svg|otf)$/,
                loader: 'file-loader',
                options: {
                    hash: 'sha512',
                    digest: 'hex',
                    name: 'fonts/[hash].[ext]',
                    publicPath: '../'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    {
                        loader: 'responsive-loader',
                        options: {
                            sizes: [300, 600, 1200, 2000],
                            placeholder: true,
                            placeholderSize: 50,
                            adapter: require('responsive-loader/sharp'),
                            hash: 'sha512',
                            digest: 'hex',
                            name: 'static/[hash].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'SleighDogs Test',
            template: './template/index.ejs',
            minify: minifyHTML(process.env.NODE_ENV)
        }),
        new ExtractTextPlugin({
            filename: path.join('css', '[name].[chunkhash].css'),
            allChunks: true
        }),
        new WebpackChunkHash()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    devtool: 'source-map'
};
