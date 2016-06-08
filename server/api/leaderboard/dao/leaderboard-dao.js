"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const leaderboardSchema = require('../model/leaderboard-model');
const _ = require('lodash');

leaderboardSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Leaderboard
          .find(_query)
          .lean()
          .exec((err, leaderboards) => {
              err ? reject(err)
                  : resolve(leaderboards);
          });
      });
};

leaderboardSchema.statics.getLeaderboardByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        let _query = {userId};

        Leaderboard
          .findOne(_query)
          .exec((err, leaderboard) => {
              err ? reject(err)
                  : resolve(leaderboard);
          });
      });
};

leaderboardSchema.statics.incrementScore = (userId) => {
  return Leaderboard.getLeaderboardByUserId(userId)
    .then(leaderboard => {
      if(! leaderboard){
        return Leaderboard.createLeaderboard({userId});
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
