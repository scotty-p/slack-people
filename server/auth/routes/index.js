'use strict';

const https = require('https');

module.exports = class AuthRoutes {
  static init(router) {
    router
      .route('/auth/callback')
      .get((req, res) => {
        if (req.query.code) {
          // redirect to /auth/callback/CODE_NUMBER
          res.redirect('/auth/callback/' + req.query.code);
        }
        res.end();
      });

    router
      .route('/auth/authenticate')
      .get((req, res) => {
        let clientId = '2194929392.48648557733';
        let clientSecret = '4390442a33a0cfad285f51f3cb6911b3';
        let url = 'https://slack.com/api/oauth.access?client_id='+ clientId + '&client_secret='+ clientSecret +'&code='+req.query.code + '&redirect_uri='+req.query.redirect_uri;

        https.get(url, (resp) => {
          var body = '';

          resp.on('data', (d) => {
            body += d;
          });

          resp.on('end', () => {
            console.log(JSON.parse(body))
            res.json(JSON.parse(body));
          });
        })
      });
  }
};
