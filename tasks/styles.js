/* eslint-disable */
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssAssets from 'postcss-assets';
import postcssShort from 'postcss-short';
import postcssNested from 'postcss-nested';
import postcssUrl from 'postcss-url';
import postcssInlineComment from 'postcss-inline-comment';
import postcssCustomMedia from 'postcss-custom-media';
import postcssMediaMinmax from 'postcss-media-minmax';
import postcssSimpleVars from 'postcss-simple-vars';
import cssnext from 'postcss-cssnext';
import stylelint from 'gulp-stylelint';
/* eslint-enable */


const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('styles', () =>
  gulp.src('src/styles/*.css')
    .pipe(plumber())
    .pipe(gulpIf(isDebug, sourcemaps.init()))
    .pipe(postcss([
      cssnext(),
      postcssImport(),
      postcssMixins(),
      postcssAssets({
        loadPaths: ['../src/resources/assets/img/'],
      }),
      postcssShort(),
      postcssSimpleVars({ silent: true }),
      postcssNested(),
      postcssUrl(),
      postcssInlineComment(),
      postcssCustomMedia(),
      postcssMediaMinmax(),
    ]))
    .pipe(gulpIf(!isDebug, cssnano({ zindex: false })))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpIf(isDebug, sourcemaps.write()))
    .pipe(gulp.dest('build/assets/styles')));


gulp.task('styles:lint', () =>
  gulp.src(['src/**/*.css', '!src/styles/**'])
    .pipe(plumber())
    .pipe(
      stylelint({
        reporters: [
          {
            formatter: 'verbose',
            console: true,
          },
        ],
      }),
    ));
