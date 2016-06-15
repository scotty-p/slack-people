"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const leaderboardSchema = require('../model/leaderboard-model');
const _ = require('lodash');

leaderboardSchema.statics.getAll = (teamId) => {
  console.log('Leaderboard DAO - getAll', teamId);
  return new Promise((resolve, reject) => {
    let _query = {teamId};

    Leaderboard
      .find(_query)
      .lean()
      .exec((err, leaderboards) => {
          err ? reject(err)
              : resolve(leaderboards.sort((a, b) => a.score < b.score));
      });
  });
};

leaderboardSchema.statics.getLeaderboardByUserId = (userId, teamId) => {

  console.log('Leaderboard DAO - getLeaderboardByUserId', userId, teamId);
    return new Promise((resolve, reject) => {
        let _query = {userId, teamId};

        Leaderboard
          .findOne(_query)
          .exec((err, leaderboard) => {
              err ? reject(err)
                  : resolve(leaderboard);
          });
      });
};

leaderboardSchema.statics.incrementScore = (userId, teamId) => {
  return Leaderboard.getLeaderboardByUserId(userId, teamId)
    .then(leaderboard => {
      if(! leaderboard){
        return Leaderboard.createLeaderboard({userId, teamId});
      }
      else {
        delete leaderboard.previousScore;
        leaderboard.currentScore++;
        if(leaderboard.currentScore > leaderboard.score){
          leaderboard.score = leaderboard.currentScore;
        }
        return saveLeaderboard(leaderboard);
      }
    });
};

leaderboardSchema.statics.finishScore = (userId, teamId) => {
  return Leaderboard.getLeaderboardByUserId(userId, teamId)
    .then(leaderboard => {
      if(! leaderboard){
        return Leaderboard.createLeaderboard({userId, teamId});
      }
      else {
        leaderboard.score = Math.max(leaderboard.currentScore, leaderboard.score);
        leaderboard.previousScore = leaderboard.currentScore;
        leaderboard.currentScore = 0;
        return saveLeaderboard(leaderboard);
      }
    });
};


function saveLeaderboard(leaderboard){
  return new Promise((resolve, reject) => {
    leaderboard.save((err, savedLeaderboard) => {
      err ? reject(err)
        : resolve(savedLeaderboard);
    });
  })
}

leaderboardSchema.statics.createLeaderboard = (leaderboard) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(leaderboard))
      return reject(new TypeError('Leaderboard is not a valid object.'));

    let _leaderboard = new Leaderboard(leaderboard);

    _leaderboard.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
};


const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;
