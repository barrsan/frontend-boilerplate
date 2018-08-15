import fs from 'fs';
/* eslint-disable */
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import data from 'gulp-data';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import pug from 'gulp-pug';
import prettify from 'gulp-jsbeautifier';
import inheritance from 'gulp-pug-inheritance';
import rename from 'gulp-rename';
import w3cjs from 'gulp-w3cjs';
/* eslint-enable */

const { NODE_ENV } = process.env;
const isDebug = NODE_ENV !== 'production';


gulp.task('markup', () => (
  gulp.src(['src/**/*.pug', '!src/pages/notwatch/*.pug'])
    .pipe(plumber())
    .pipe(changed('build', { extension: '.html' }))
    .pipe(inheritance({ basedir: 'src/blocks', skip: 'node_modules' }))
    .pipe(filter(file => /src[\\\/]page/.test(file.path))) // eslint-disable-line
    .pipe(data(() => {
      const dataJSON = JSON.parse(fs.readFileSync('./src/data/data.json'));
      dataJSON.timestamp = Date.now();
      return dataJSON;
    }))
    .pipe(pug({ basedir: './' }))
    .pipe(gulpIf(!isDebug, prettify({
      braceStyle: 'expand',
      indentWithTabs: true,
      indentInnerHtml: true,
      preserveNewlines: true,
      endWithNewline: true,
      wrapLineLength: 120,
      maxPreserveNewlines: 50,
      wrapAttributesIndentSize: 1,
      unformatted: ['use'],
    })))
    .pipe(rename({ dirname: '.' }))
    .pipe(gulp.dest('build'))
));

gulp.task('markup:w3c', () => (
  gulp.src('build/*.html')
    .pipe(w3cjs({}))
));
