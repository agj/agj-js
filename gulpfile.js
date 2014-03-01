
var gulp = require('gulp');
var gutil = require('gulp-util');
var rjs = require('requirejs');
var rjsReplace = require('gulp-requirejs-replace-script');
var replace = require('gulp-replace');
var clean = require('gulp-clean');


var path = {
	src:   'src/',
	build: 'build/',
};


gulp.task('default', ['clean'], function () {
	gulp.start('build');
});
gulp.task('build', ['copyHTML', 'copyFiles', 'parseAMD']);


gulp.task('clean', function () {
	return gulp.src([path.build + '**/*'], { read: false })
		.pipe(clean());
});

gulp.task('copyHTML', function () {
	return gulp.src(path.src + '*.html')
		.pipe(rjsReplace(['js/main']))
		.pipe(replace(/(src="js\/)main(\.js")/g, '$1script$2'))
		.pipe(gulp.dest('deploy/'));
});

gulp.task('copyFiles', function () {
	return gulp.src(['src/+(images|css)/**/*'], { base: 'src/' })
		.pipe(gulp.dest('deploy/'));
});

gulp.task('parseAMD',
	function (callback) {
		gutil.log(
			rjs.optimize(
				{
					baseUrl: path.src + 'js/lib/',
					name: '../../../node_modules/almond/almond',
					include: '../main',
					out: path.build + 'js/script.js',
					wrap: true,
					optimize: 'uglify2',
				},
				function (buildResponse) {
					callback();
				},
				callback
			)
		);
	}
);

