import gulp from 'gulp';
import runSequence from 'run-sequence';
import {tasks} from './const';

gulp.task(tasks.CLIENT_BUILD_DEV, [
  tasks.CLIENT_BUILD_TS
]);

gulp.task(tasks.CLIENT_BUILD_DIST, () => {
  runSequence(tasks.CLIENT_BUILD_TS,
              tasks.CLIENT_BUILD_TS_WATCH,
              // tasks.CLIENT_UNIT_TEST,
              tasks.CLIENT_DEL_DIST,
              tasks.CLIENT_COPY,
              [tasks.CLIENT_IMAGE_DIST,
               tasks.CLIENT_JS_DIST],
                tasks.CLIENT_SW_DIST,
                tasks.CLIENT_VIEWS_DIST);
});
