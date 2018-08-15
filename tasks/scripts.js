/* eslint-disable */
import gulp from 'gulp';
import webpackStream from 'webpack2-stream-watch';
import plumber from 'gulp-plumber';
import makeWebpackConfig from '../webpack.config.babel';
/* eslint-enable */


const { NODE_ENV, NOTIFY } = process.env;
const isDebug = NODE_ENV !== 'production';

const runWebpack = (watch = false) => {
  const webpackConfig = makeWebpackConfig({
    watch,
    debug: isDebug,
    sourcemaps: isDebug,
    notify: NOTIFY,
  });

  return gulp.src('src/scripts/app.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('build/assets/scripts'));
};

gulp.task('scripts', () => runWebpack(false));
gulp.task('scripts:watch', () => runWebpack(true));
