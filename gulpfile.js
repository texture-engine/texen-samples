'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
    // http://stackoverflow.com/a/23398200
    function stringSrc(filename, string) {
        var src = require('stream').Readable({objectMode: true})

        src._read = function () {
            this.push(new util.File({cwd: '', base: '', path: filename, contents: new Buffer(string)}));
            this.push(null)
        };

        return src
    }

    var json = JSON.stringify(require('./index.js'), null, 4);

    return stringSrc('texen-samples.js', 'var txSamples = ' + json + ';')
        .pipe(gulp.dest('dist'))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(rename('texen-samples.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
});

gulp.task('del', function (done) {
    var del = require('del');

    del(['dist']).then(function () {
        done();
    });
});
