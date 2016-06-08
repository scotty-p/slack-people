"use strict";


const QuizRoutes = require('../api/quiz/routes/quiz-routes');

const StaticDispatcher = require('../commons/static/index');

module.exports = class Routes {
   static init(app, router) {

     QuizRoutes.init(router);

     router.route('/auth/callback')
       .get(function(req, res) {
         if (req.query.code) {
           // redirect to /auth/callback/CODE_NUMBER
           res.redirect('/auth/callback/' + req.query.code);
         }
         res.end();
       });

     router
       .route('*')
       .get(StaticDispatcher.sendIndex);

     app.use('/', router);
   }
}
