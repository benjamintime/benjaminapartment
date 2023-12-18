const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// Tareas de estilos
gulp.task('styles', function () {
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Tarea de scripts
gulp.task('scripts', function () {
  return gulp
    .src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Tarea de observación
gulp.task('watch', function () {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });

  gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
  gulp.watch('src/js/**/*.js', gulp.series('scripts'));
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Tarea predeterminada
gulp.task('default', gulp.parallel('styles', 'scripts', 'watch'));

// Tarea de construcción (build)
gulp.task('build', gulp.parallel('styles', 'scripts'));
