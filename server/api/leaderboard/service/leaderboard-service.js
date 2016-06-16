"use strict";

const request = require('request-promise');
const uuid = require('uuid');
const LeaderboardDAO = require('../dao/leaderboard-dao');
const sha1 = require('sha1');

let tokenToRtmStartCache = {};


module.exports = class LeaderboardService {

  static getLeaderboard(token) {
    return LeaderboardService.getRtmStartFromToken(token)
      .then((rtmStart) => {
        return Promise.all([
          LeaderboardDAO.getLeaderboardByUserId(LeaderboardService.getUserIdFromRtmStart(rtmStart), LeaderboardService.getTeamIdFromRtmStart(rtmStart)),
          LeaderboardDAO.getAll(LeaderboardService.getTeamIdFromRtmStart(rtmStart))
        ]).then((result) => {
            console.log('LeaderboardService getLeadboard result', result);
            return {
              currentScore: result[0],
              leaderboards: result[1].sort((a, b) => b.score > a.score)
            };
          });
      });
  }

  static getScore(token){
    return LeaderboardService.getRtmStartFromToken(token)
      .then(rtmStart => {
        return LeaderboardDAO.getLeaderboardByUserId(LeaderboardService.getUserIdFromRtmStart(rtmStart), LeaderboardService.getTeamIdFromRtmStart(rtmStart));
      });
  }

  static addScore(token){
    return LeaderboardService.changeScore(token, LeaderboardDAO.incrementScore);
  }

  static finishScore(token){
    return LeaderboardService.changeScore(token, LeaderboardDAO.finishScore);
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

    //TODO invalidate this after awhile
    return tokenToRtmStartCache[shaToken] ? Promise.resolve(tokenToRtmStartCache[shaToken]) :
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

  }

};
