/* eslint-disable */
import gulp from 'gulp';
/* eslint-enable */

gulp.task('watch', () => {
  global.watch = true;

  gulp.watch([
    'src/{pages,blocks}/**/*.pug',
    'src/data/**/*.json',
    '!src/pages/notwatch/*.pug',
  ], gulp.series('markup'));

  gulp.watch('src/{styles,blocks}/**/*.css',
    // gulp.series('styles', 'styles:lint'),
    gulp.series('styles'),
  );

  gulp.watch('src/resources/**/*.*',
    gulp.series('copy'),
  );
});
