/* eslint-disable */
import gulp from 'gulp';
import changed from 'gulp-changed';
/* eslint-enable */

gulp.task('copy', () => (
  gulp.src('src/resources/**/*')
    .pipe(changed('build'))
    .pipe(gulp.dest('build'))
));
