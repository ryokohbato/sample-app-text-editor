const gulp = require('gulp');
const webserver = require('gulp-webserver');

gulp.task('server', function() {
  gulp.src('dist')
    .pipe(webserver({
      host: 'localhost',
      port: 9001,
      livereload: true,
      open : 'http://localhost:9001/index.html',
    }));
});
