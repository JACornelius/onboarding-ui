var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('hello', function(){
	console.log('Hello World!');
});

gulp.task('server', function(){
	connect.server({
		root: ['src', 'dist'],
		port: 9000
	});
});

gulp.task('sass', function(){
    return gulp.src('./src/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css/'));
});

const bundle = (b) => {
    return b.bundle()
            .on('error', function (err) {
    gutil.log(err.toString());
     this.emit('end');
     })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
    // Add transformation tasks to the pipeline here.
     // .pipe(config.production ? uglify() : gulpUtil.noop())
     .pipe(sourcemaps.write('./'))
     //.pipe(gulp.dest('./build' + config.versionPath + '/js/'));
    .pipe(gulp.dest('./dist/js/'));
}

gulp.task('js', function() {
    return browserify({
        debug: true,
        entries: ['./src/js/main.js'],
        paths: ['./src/js', './node_modules'],
        cache: {},
        packageCache: {}
    }).transform(babelify)
        .bundle()
        .on('error', function (err) {
            gutil.log(err.toString());
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(connect.reload());
});



gulp.task('dev',['sass', 'js', 'server']);
