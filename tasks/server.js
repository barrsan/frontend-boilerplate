/* eslint-disable */
import gulp from 'gulp';
import devIP from 'dev-ip';
import browserSync from 'browser-sync';
/* eslint-enable */


const bs = browserSync.create();
const { PORT, OPEN, TUNNEL } = process.env;
const HOST = devIP();

gulp.task('server', () => {
  bs.init({
    files: ['build/**/*.*'],
    open: !!OPEN,
    notify: false,
    reloadOnRestart: true,
    // reloadDelay: 1000,
    host: HOST,
    port: PORT || 3000,
    snippetOptions: {
      rule: {
        match: /<\/body>/i,
      },
    },
    server: {
      baseDir: [
        'src/resources',
        'build',
      ],
      directory: false,
    },
    tunnel: !!TUNNEL,
  });

  bs.watch().on('change', bs.reload);
});
