var gulp = require('gulp');
var elixir = require('laravel-elixir');
var urlAdjuster = require('gulp-css-url-adjuster');
var rename = require('gulp-rename');
var files = [];

/*
 |----------------------------------------------------------------
 | adjust css urls for images and stuff
 |----------------------------------------------------------------
 |
 | A wrapper for gulp-css-url-adjuster.
 |
 */

elixir.extend('urlAdjuster', function(input, options, output, newname) {

    files.push({
        input: input,
        options: options,
        output: output,
        newname: newname
    });

    var stream;

    gulp.task('urlAdjuster', function() {
        files.forEach(function(toUrlAdjust) {
            stream = gulp.src(toUrlAdjust.input)
            stream.pipe(urlAdjuster(toUrlAdjust.options));
            if (typeof toUrlAdjust.newname !== 'undefined') {
                stream.pipe(rename(toUrlAdjust.newname));
            }
            stream.pipe(gulp.dest(toUrlAdjust.output));
        });
        
        return stream;
    });

    return this.queueTask('urlAdjuster');
});
