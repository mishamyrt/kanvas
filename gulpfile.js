const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const BabelPlugin = require("babel-webpack-plugin");

const folder = {
    source: './source',
    build:  './build'
}

gulp.task('default', function () {
    gulp.start('build');
});

gulp.task('watch', function () {
    // gulp.watch(, function () {
    //     gulp.start('dev');
    // });
    gulp.watch(folder.source + '/**/*.js', ['dev']);
});

gulp.task('dev', function () {
    gulp.src(folder.source + '/kanvas.js')
        .pipe(webpackStream({
            entry: {
                kanvas: folder.source + '/kanvas.js'
            },
            output: {
                filename: 'kanvas.js',
            },
            plugins: [
                new BabelPlugin()
            ]
        }))
        .pipe(gulp.dest(folder.build));
});