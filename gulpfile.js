//-- Includes -----------------------------------------------------
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    order = require('gulp-order'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat');


//-- Bower Dependencies -----------------------------------------------------

var bowerJsDependencies = [
  './vendor/jquery/dist/jquery.js',
  './vendor/chartjs/Chart.js'
];

var bowerCssDependencies = [
  './vendor/font-awesome/css/font-awesome.css',
  './vendor/animate.css/animate.css',
  './vendor/normalize.css/normalize.css'
];

//-- Convert Jade to HTML -----------------------------------------------------

gulp.task('jade', function() {
  return gulp.src('./source/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dist/html'));
});

//-- Concat & Minify Stylus -----------------------------------------------------

gulp.task('styl', function() {
  return gulp.src('./source/stylus/urbanadventures.styl')
    .pipe(stylus({errors: false}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minify())
    .pipe(gulp.dest('./dist/css'));
});

//-- Concat & Minify JS -----------------------------------------------------
gulp.task('js', function() {
  return gulp.src('./source/js/*.js')
    .pipe(order([
      'urbanadventures.js',
      '*.js'
    ]))
    .pipe(concat('urbanadventures.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

//-- Manage vendor CSS -----------------------------------------------------
gulp.task('vendor-css', function() {
  return gulp.src(bowerCssDependencies)
  .pipe(concat('vendor.css'))
  .pipe(minify())
  .pipe(gulp.dest('./dist/css'));
});

//-- Manage vendor JS -----------------------------------------------------
gulp.task('vendor-js', function() {
  return gulp.src(bowerJsDependencies)
    .pipe(order([
      'jquery.js',
      '*.js'
    ]))
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

//-- Copy Font Awesome Fonts to the Dist Directory ---------------------------------------
gulp.task('fonts', function() {
  return gulp.src('./vendor/font-awesome/fonts/**/*.*')
    .pipe(gulp.dest('./dist/fonts'));
});


//-- Watch Files for Changes -----------------------------------------------------

gulp.task('watch', function(){
  gulp.watch('./source/jade/**/*.jade', ['jade']);
  gulp.watch('./source/js/**/*.js', ['js']);
  gulp.watch('./source/stylus/**/*.styl', ['styl']);
})

//-- Default Task -----------------------------------------------------

gulp.task('default', ['styl', 'js', 'jade', 'vendor-css', 'vendor-js', 'fonts', 'watch']);
