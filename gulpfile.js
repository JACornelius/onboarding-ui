var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('hello', function(){
	console.log('Hello World!');
});

gulp.task('dev', function(){
	connect.server({
		root: 'src',
		port: 9000
	});
});
