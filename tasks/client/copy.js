import gulp from 'gulp';
import rename from 'gulp-rename';
import {path, tasks} from './const';

gulp.task('html-index-copy', () => {

  return gulp.src(path.DEV + 'index-dist.html')
    .pipe(rename(path.DEV + 'index.html'))
    .pipe(rename(function(path) {
      path.dirname = path.dirname.replace('client/dev', '').replace('client/dev/', '')
    }))
    .pipe(gulp.dest(path.DIST));
});

gulp.task('js-copy', () => {

  var src = [
    path.JS + '**/*.js',
    path.JS + '**/*.map'
  ];

  return gulp.src(src)
    .pipe(rename(function(path) {
      path.dirname = path.dirname.replace('client/dev', '').replace('client/dev/', '')
    }))
    .pipe(gulp.dest(path.DIST));

});


gulp.task(tasks.CLIENT_COPY, ['js-copy', 'html-index-copy'], () => {

  var src = [
    path.DEV + '**/*.css',
    path.DEV + '**/*.js',
    path.DEV + '**/*.svg',
    path.DEV + '**/*.woff',
    path.DEV + '**/*.eot',
    path.DEV + 'manifest.json'
  ];

  return gulp.src(src)
    .pipe(gulp.dest(path.DIST));
});
