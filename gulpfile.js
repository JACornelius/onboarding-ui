var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('hello', function(){
	console.log('Hello World!');
});

gulp.task('server', function(){
	connect.server({
		root: 'src',
		port: 9000
	});
});

gulp.task('sass', function(){
	return gulp.src('./src/sass/style.scss')
	.pipe(sass())
	.pipe(gulp.dest('./src/css/'));
});

gulp.task('dev',['sass', 'server']);
