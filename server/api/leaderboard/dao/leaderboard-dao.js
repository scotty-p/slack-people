"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const leaderboardSchema = require('../model/leaderboard-model');
const _ = require('lodash');

leaderboardSchema.statics.getAll = (teamId) => {
    return new Promise((resolve, reject) => {
        let _query = {teamId};

        Leaderboard
          .find(_query)
          .lean()
          .exec((err, leaderboards) => {
              err ? reject(err)
                  : resolve(leaderboards);
          });
      });
};

leaderboardSchema.statics.getLeaderboardByUserId = (userId, teamId) => {
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
        leaderboard.score++;
        return new Promise((resolve, reject) => {
          leaderboard.save((err, savedLeaderboard) => {
            err ? reject(err)
              : resolve(savedLeaderboard);
          });
        })
      }
    })
    .then(leaderboard => {
      console.log('Incremented leaderboard', leaderboard);
      return leaderboard;
    });
};

leaderboardSchema.statics.reduceScore = (userId, teamId) => {
  return Leaderboard.getLeaderboardByUserId(userId, teamId)
    .then(leaderboard => {
      if(! leaderboard){
        return Leaderboard.createLeaderboard({userId, teamId});
      }
      else {
        leaderboard.score = Math.max(--leaderboard.score, 0);
        return new Promise((resolve, reject) => {
          leaderboard.save((err, savedLeaderboard) => {
            err ? reject(err)
              : resolve(savedLeaderboard);
          });
        })
      }
    })
    .then(leaderboard => {
      console.log('Decremented leaderboard', leaderboard);
      return leaderboard;
    });
};

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
