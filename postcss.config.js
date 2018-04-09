module.exports = {
    plugins: [
        require('css-mqpacker'),
        require('cssnano')({zindex: false})
    ]
};