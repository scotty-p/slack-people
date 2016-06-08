"use strict";

const mongoose = require('mongoose');

const _leaderboardSchema = {
  userId: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  score: {type: Number, default: 1}
};

module.exports = mongoose.Schema(_leaderboardSchema);
