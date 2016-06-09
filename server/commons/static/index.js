"use strict";

const fs = require('fs');

module.exports = class StaticDispatcher {
    static sendIndex(req, res) {
      var _root = process.cwd();

      res.type('.html');

      let _clientIndex = (process.env.NODE_ENV === 'production') ? '/client/dist/index-dist.html' : '/client/dev/index.html';

      fs.createReadStream(_root + _clientIndex)
        .pipe(res);
    }
}
