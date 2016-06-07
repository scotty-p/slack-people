"use strict";

//const TodoRoutes = require('../api/todo/routes/todo-routes');

const StaticDispatcher = require('../commons/static/index');


module.exports = class Routes {
   static init(app, router) {
     //TodoRoutes.init(router);

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
