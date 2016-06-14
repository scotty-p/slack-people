"use strict";

const request = require('request-promise');
const crypto = require('crypto');
const secret = 'abcdefg';
const uuid = require('uuid');
const LeaderboardDAO = require('../dao/leaderboard-dao');
const sha1 = require('sha1');

let tokenToUserIdCache = {};

module.exports = class LeaderboardService {


  static getLeaderboard(token){

    return LeaderboardDAO.getAll();
  }


  static addScore(token){
    return LeaderboardService.changeScore(token, LeaderboardDAO.incrementScore);
  }

  static reduceScore(token){
    return LeaderboardService.changeScore(token, LeaderboardDAO.reduceScore);
  }


  static changeScore(token, daoFunction){
    let shaToken = LeaderboardService.getTokenSha(token);

    return Promise.resolve()
      .then(() => {
        return tokenToUserIdCache[shaToken] ? tokenToUserIdCache[shaToken] :
          LeaderboardService.getUserFromToken(token).then(user => user.id);
      })
      .then(userId => {

        if(userId){
          tokenToUserIdCache[shaToken] = userId;
          return daoFunction(userId);
        }
        else {
          throw new Error('No user id found');
        }

      })
      .catch(err => {
        console.error('Leaderboard Service Error', err);
        throw err;
      });
  }

  static getTokenSha(token){
    return sha1(token);
  }

  static getUserFromToken(token){
    return request.get(`https://slack.com/api/users.identity?token=${token}`)
      .then(response => JSON.parse(response))
      .then(responseJson => {
        if(! responseJson.ok || ! responseJson.user){
          console.error('Invalid user response in leaderboard service', responseJson);
          throw new Error('Invalid user response in leaderboard service');
        }
        else {
          return responseJson.user;
        }
      });
  }

};
