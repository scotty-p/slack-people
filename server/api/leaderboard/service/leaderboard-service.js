"use strict";

const request = require('request-promise');
const crypto = require('crypto');
const secret = 'abcdefg';
const uuid = require('uuid');
const LeaderboardDAO = require('../dao/leaderboard-dao');


let tokenToUserIdCache = {};

module.exports = class LeaderboardService {

  static getLeaderboard(token){
    return LeaderboardDAO.getAll();
  }

  //TODO namespace leaderboards based on team id

  static addScore(token){
    return Promise.resolve()
      .then(() => {
        //TODO should really hash these so we are not storing access tokens on the server
        return tokenToUserIdCache[token] ? tokenToUserIdCache[token] :
          LeaderboardService.getUserFromToken(token).then(user => user.id);
      })
      .then(userId => {
        tokenToUserIdCache[token] = userId;
        return LeaderboardDAO.incrementScore(userId);
      });
  }

  static reduceScore(token){
    return Promise.resolve()
      .then(() => {
        //TODO should really hash these so we are not storing access tokens on the server
        return tokenToUserIdCache[token] ? tokenToUserIdCache[token] :
          LeaderboardService.getUserFromToken(token).then(user => user.id);
      })
      .then(userId => {
        tokenToUserIdCache[token] = userId;
        return LeaderboardDAO.reduceScore(userId);
      });
  }

  static getUserFromToken(token){
    return request.get(`https://slack.com/api/users.identity?token=${token}`)
      .then(response => JSON.parse(response))
      .then(responseJson => responseJson.user)
  }

};
