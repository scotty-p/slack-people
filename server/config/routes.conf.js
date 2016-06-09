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
        let _clientFiles = (process.env.NODE_ENV === 'production') ? '/client/dist/' : '/client/dev/';

        application.use(express.static(_root + _nodeModules));
        application.use(express.static(_root + _clientFiles));
        application.use(compression());
        application.use(bodyParser.json());
        application.use(morgan('dev'));
        application.use(contentLength.validateMax({max: 999}));
        application.use(helmet());
        application.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "slack.com");
          res.header("Access-Control-Allow-Headers", "X-Requested-With");
          next();
        });
    }
}
