// ////////////////////////////
// Required
// ////////////////////////////

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	compass = require('gulp-compass'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	del = require('del');

// ////////////////////////////
// Scripts Task
// ////////////////////////////

gulp.task('scripts', function(){
	gulp.src(['js/**/*.js', '!js/**/*.min.js', '!js/**/jquery.fancybox.pack.js'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('js'))
		.pipe(reload({stream:true}));
});

// ////////////////////////////
// Compass/Sass Task
// ////////////////////////////

gulp.task('compass', function(){
	gulp.src('sass/*.scss')
		.pipe(plumber())
		.pipe(compass({
			config_file: 'config.rb',
			css: 'css',
			sass: 'sass',
			require: ['susy']
		}))
		.pipe(rename({suffix:'.min'}))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('css/'))
		.pipe(reload({stream:true}));
});

// ////////////////////////////
// HTML Task
// ////////////////////////////

gulp.task('html', function(){
	gulp.src('**/*.html')
	.pipe(reload({stream:true}));
})

// ////////////////////////////
// Build Tasks
// ////////////////////////////

// clear out all files and folders from build folder
gulp.task('build:cleanfolder', function() {
	del([
		'build/**'
		]);
});

// task to create build directory for all files
gulp.task('build:copy', ['build:cleanfolder'], function(){
	return gulp.src(
		'**/*'
		)
	.pipe(gulp.dest('build/'));
});

// task to remove unwanted build files
gulp.task('build:remove', ['build:copy'], function(cb){
	del([
		'build/js/!(*.min.js)',
		'build/css/main.css',
		'build/bower_components/',
		'build/node_modules/',
		'build/package.json',
		'build/config.rb',
		'build/bower.json',
		'build/gulpfile.js',
		'build/readme.md',
		'build/sass/',
		'build/build'
		], cb);
});

gulp.task('build', ['build:cleanfolder', 'build:copy', 'build:remove']);

// ////////////////////////////
// Browser-Sync Task
// ////////////////////////////

gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: ""
		}
	})
});

// ////////////////////////////
// Watch Task
// ////////////////////////////

gulp.task('watch', function(){
	gulp.watch('js/**/*.js', ['scripts']);
	gulp.watch('sass/*.scss', ['compass']);
	gulp.watch('**/*.html', ['html']);
});

// ////////////////////////////
// Scripts Task
// ////////////////////////////

gulp.task('default', ['scripts', 'compass', 'html', 'browser-sync', 'watch']);