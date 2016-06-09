import gulp from 'gulp';
import uglify from 'gulp-uglify';
import {path, tasks} from './const';
var Builder = require('systemjs-builder');

const JS = path.DIST + '**/*.js';


gulp.task(tasks.CLIENT_JS_DIST, () => {

  //TODO move into correct gulp location

  // optional constructor options
  // sets the baseURL and loads the configuration file

  var current = __dirname + '/../../client/dist/dist-config.js';

  console.log('Creating systemjs-builder', current);
  console.log('Current directory', __dirname);

  var builder = new Builder(__dirname + '/../../', current);

  builder
    .buildStatic(__dirname + '/../../client/dist/index.js', __dirname + '/../../client/dist/bundle.js', { minify: true })
    .then(function() {
      console.log('System js build complete');
    })
    .catch(function(err) {
      console.log('Build error');
      console.log(err);
    });

  return gulp.src(JS, {base: path.DIST})
             .pipe(uglify())
             .pipe(gulp.dest(path.DIST));
});
