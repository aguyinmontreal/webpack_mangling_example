const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Webpack = require('webpack');
const ENV = process.env.STAGE || 'production';
const IsDev = ENV === 'DEV';
const getPath = names => names.map(name => `${__dirname}/unbundledCSS/${name}`);

module.exports = {
    entry: {
        'bundle.css': getPath(['semantic.css'])
                .concat(getPath(['style.css']))
    },
    output: {
        path: __dirname + '/bundledCSS/',
        filename: '[name]'
    },
    resolve: {
        modules: ['node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'es2015',
                        'stage-0'
                    ],
                    plugins: []
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif)$/,
                loader: 'file-loader?name=resources/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./[name]'),
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        })
    ]
};


