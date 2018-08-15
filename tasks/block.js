import fs from 'fs';
/* eslint-disable */
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import prompt from 'gulp-prompt';
/* eslint-enable */


gulp.task('mkblock', () => (
  gulp.src('src/**/*.*')
    .pipe(plumber())
    .pipe(prompt.prompt({
      type: 'input',
      name: 'block',
      message: 'Type block name:',
    }, (res) => {
      const dir = `src/blocks/${res.block}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        fs.writeFile(`${dir}/${res.block}.pug`, '', (err) => { if (err) throw err; });
        fs.writeFile(`${dir}/${res.block}.css`, '', (err) => { if (err) throw err; });
        fs.writeFile(`${dir}/${res.block}.js`, '', (err) => { if (err) throw err; });
      } else {
        console.log('the block exists'); // eslint-disable-line
      }
    }))
));
