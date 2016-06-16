"use strict";

const morgan = require('morgan');
const bodyParser = require('body-parser');
const contentLength = require('express-content-length-validator');
const helmet = require('helmet');
const express = require('express');
const compression = require('compression');

module.exports = class RouteConfig {
    static init(application) {
        let _root = process.cwd();
        let _nodeModules = '/node_modules/';


        if(process.env.NODE_ENV === 'production'){
          application.use(express.static(_root + _nodeModules, {setHeaders: setStaticHeaders}));
          application.use(express.static(_root + '/client/dist/', {setHeaders: setStaticHeaders}));
        }
        else {
          application.use(express.static(_root + _nodeModules));
          application.use(express.static(_root + '/client/dev/'));
          application.use(express.static(_root + '/client/js/client/dev/'));
        }


        application.use(compression());
        application.use(bodyParser.json());
        application.use(morgan('dev'));
        application.use(contentLength.validateMax({max: 9999}));
        application.use(helmet());
        application.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "slack.com");
          res.header("Access-Control-Allow-Headers", "X-Requested-With");
          next();
        });
    }
}



function setStaticHeaders(res, path, stat){

  if(path){
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!! NEVER cache the service worker !!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if(path.indexOf('service-worker.js') !== -1){ return; }

    if(path.indexOf('.ttf') !== -1 ||
      path.indexOf('.css') !== -1 ||
      path.indexOf('.js') !== -1 ||
      path.indexOf('.png') !== -1){
      res.setHeader('Cache-Control', 'public, max-age=' + getStaticAge());
    }
  }

}

function getStaticAge(){
  return 86400000; // 1day
}
