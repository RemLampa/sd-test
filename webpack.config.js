const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const WebpackChunkHash = require('webpack-chunk-hash');

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
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }],
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
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'SleighDogs Test',
            template: './template/index.ejs',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }),
        new ExtractTextPlugin({
            filename: path.join('css', '[name].[chunkhash].css'),
            allChunks: true
        }),
        new CopyWebpackPlugin([{
            from: './static',
            to: './static'
        }]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i
        }),
        new WebpackChunkHash()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    devtool: 'source-map'
};
