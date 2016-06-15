import gulp from 'gulp';
import {tasks, path as pathConsts} from './const';

gulp.task(tasks.CLIENT_SW_DIST, (callback) => {
    console.log(tasks.CLIENT_SW_DIST);
    var path = require('path');
    var swPrecache = require('sw-precache');
    var rootDir = pathConsts.DIST;

    swPrecache.write(path.join(rootDir, 'service-worker.js'), {
        staticFileGlobs: [rootDir + '**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
        stripPrefix: rootDir
    }, callback);
});