const gulp = require('gulp');

gulp.task('copy-html', function () {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-img', function () {
  return gulp.src('src/img/*') // Cambia la ruta según tu estructura de archivos
    .pipe(gulp.dest('dist/img'));
});

gulp.task('build', gulp.parallel('copy-html', 'copy-img'));
