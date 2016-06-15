"use strict";

const mongoose = require('mongoose');

const _leaderboardSchema = {
  userId: {type: String, required: true, trim: true},
  teamId: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  currentScore: {type: Number, default: 0},
  previousScore: {type: Number},
  score: {type: Number, default: 0}
};

module.exports = mongoose.Schema(_leaderboardSchema);
