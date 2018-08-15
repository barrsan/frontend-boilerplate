/* eslint-disable */
import gulp from 'gulp';
/* eslint-enable */

process.env.NODE_PATH = `${__dirname}/src`;

gulp.task('default',
  gulp.series('styles', 'markup',
    gulp.parallel('server', 'watch', 'scripts:watch'),
  ),
);

gulp.task('build', gulp.series('copy', 'styles', 'markup', 'scripts'));
