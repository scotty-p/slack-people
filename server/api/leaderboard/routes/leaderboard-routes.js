"use strict";

const LeaderboardController = require('../controller/leaderboard-controller');

module.exports = class LeaderboardRoutes {
    static init(router) {
      router
        .route('/api/leaderboard')
        .get(LeaderboardController.getLeaderboard);

    }
};
