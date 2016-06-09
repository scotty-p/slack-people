import gulp from 'gulp';
import {path, tasks} from './const';

gulp.task(tasks.CLIENT_COPY, () => {

  var src = [
    path.DEV + '**/*.html',
    path.DEV + '**/*.css',
    path.DEV + '**/*.js',
    path.JS + '**/*.js',
    path.JS + '**/*.map'

  ];

  return gulp.src(src)
             .pipe(gulp.dest(path.DIST));
});
