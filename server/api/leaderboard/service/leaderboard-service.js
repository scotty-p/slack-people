"use strict";

const request = require('request-promise');
const crypto = require('crypto');
const secret = 'abcdefg';
const uuid = require('uuid');
const LeaderboardDAO = require('../dao/leaderboard-dao');
const sha1 = require('sha1');

let tokenToRtmStartCache = {};


module.exports = class LeaderboardService {

  static getLeaderboard(token) {
    return LeaderboardService.getRtmStartFromToken(token)
      .then(rtmStart => {

        //TODO make sure this returns the namespaced team leaderboard

        return LeaderboardDAO.getAll(LeaderboardService.getTeamIdFromRtmStart(rtmStart));
      });
  }

  static addScore(token){
    return LeaderboardService.changeScore(token, LeaderboardDAO.incrementScore);
  }

  static reduceScore(token){
    return LeaderboardService.changeScore(token, LeaderboardDAO.reduceScore);
  }

  static changeScore(token, daoFunction){

    return LeaderboardService.getRtmStartFromToken(token)
      .then(rtmStart => {
        return daoFunction(LeaderboardService.getUserIdFromRtmStart(rtmStart), LeaderboardService.getTeamIdFromRtmStart(rtmStart));
      })
      .catch(err => {
        console.error('Leaderboard Service Error', err);
        throw err;
      });
  }

  static getTeamIdFromRtmStart(rtmStart){
    return rtmStart && rtmStart.team && rtmStart.team.id;
  }

  static getUserIdFromRtmStart(rtmStart){
    return rtmStart && rtmStart.self && rtmStart.self.id;
  }

  static getTokenSha(token){
    return sha1(token);
  }

  static getRtmStartFromToken(token){

    let shaToken = LeaderboardService.getTokenSha(token);

    return Promise.resolve()
      .then(() => {
        return tokenToRtmStartCache[shaToken] ? tokenToRtmStartCache[shaToken] :
          request.get(`https://slack.com/api/rtm.start?token=${token}`)
            .then(response => JSON.parse(response))
            .then(responseJson => {
              if(! responseJson.ok || ! responseJson.self || ! responseJson.self.id ||
                ! responseJson.team || ! responseJson.team.id){
                console.error('Invalid user response in leaderboard service', responseJson);
                throw new Error('Invalid user response in leaderboard service');
              }
              else {
                tokenToRtmStartCache[shaToken] = responseJson;
                return responseJson;
              }
            });
      })


  }

};
