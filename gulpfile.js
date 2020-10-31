const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  ghPages = require('gh-pages'),
  path = require('path')

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  })
})

gulp.task('html', () => {
  return gulp.src('app/*.html').pipe(browserSync.stream())
})

gulp.task('js', () => {
  return gulp.src('app/js/*.js').pipe(browserSync.stream())
})

gulp.task('deploy', function (cb) {
  ghPages.publish(path.join(process.cwd(), '/app'), cb)
})

gulp.task('watch', () => {
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/**/*.js', gulp.parallel('js'))
})

gulp.task('default', gulp.parallel('browser-sync', 'watch'))
