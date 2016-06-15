"use strict";


const LeaderboardService = require('../service/leaderboard-service');

module.exports = class LeaderboardController {

  static getLeaderboard(req, res) {

    let token = LeaderboardController.getTokenFromRequest(req, res);

    try {

      console.log('Leaderboard Controller - getLeaderboard');

      return LeaderboardService.getLeaderboard(token)
        .then(leaderboard => res.status(200).json(leaderboard))
        .catch(error => LeaderboardController.handleError(error, res));
    }
    catch(error){
      return LeaderboardController.handleError(error, res);
    }

  }

  static handleError(error, res){
    console.error('Error in Leaderboard Controller', error);
    return res.status(400).json(error);
  }

  static getTokenFromRequest(req, res){
    let token = req.params.token;
    if(! token){
      console.error('No token passed');
      res.status(400);
      throw new Error('No token passed');
    }
    return token;
  }

};
