"use strict";

const QuizRoutes = require('../api/quiz/routes/quiz-routes');
const LeaderboardRoutes = require('../api/leaderboard/routes/leaderboard-routes');
const AuthRoutes = require('../auth/routes/');
const StaticDispatcher = require('../commons/static/index');

module.exports = class Routes {
   static init(app, router) {

     QuizRoutes.init(router);
     LeaderboardRoutes.init(router);
     AuthRoutes.init(router);

     router
       .route('*')
       .get(StaticDispatcher.sendIndex);

     app.use('/', router);
   }
}
