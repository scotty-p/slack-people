'use strict';

const https = require('https');



let app = getAppConfig();


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
        let url = 'https://slack.com/api/oauth.access?client_id='+ app.clientId + '&client_secret='+ app.clientSecret +'&code='+req.query.code + '&redirect_uri='+req.query.redirect_uri;

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


function getAppConfig(){
  let app;

  try {
    app = require('../../config/app.json');
  }
  catch(err){
    app = {
      "clientId": process.env.SLACK_CLIENT_ID,
      "clientSecret": process.env.SLACK_CLIENT_SECRET
    }
  }

  if(! app || ! app.clientId){
    throw new Error('Need to set process.env.SLACK_CLIENT_ID and process.env.SLACK_CLIENT_SECRET or create /server/config/app.json');
  }

  return app;
}
