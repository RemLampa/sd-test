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
        filename: path.join('scripts', '[name].js?[chunkhash]')
    },
    module: {
        rules: [
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
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '../',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'resolve-url-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(woff2?|ttf|eot|svg|otf)$/,
                loader: 'file-loader',
                options: {
                    hash: 'sha512',
                    digest: 'hex',
                    name: 'fonts/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'responsive-loader',
                options: {
                    sizes: [300, 600, 1200, 2000],
                    placeholder: true,
                    placeholderSize: 50,
                    adapter: require('responsive-loader/sharp'),
                    hash: 'sha512',
                    digest: 'hex',
                    name: 'static/[name].[ext]?[hash]',
                }
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
            filename: 'styles/[name].css?[chunkhash]',
            allChunks: true
        }),
        new WebpackChunkHash()
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    devtool: 'source-map'
};
