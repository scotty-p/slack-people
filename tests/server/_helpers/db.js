import Leaderboard from '../../../server/api/leaderboard/dao/leaderboard-dao';
import dbJson from './db.json';

exports.setupMongoose = (mongoose) => {
  mongoose.models = {};
  mongoose.connect(dbJson.db.test.url);
  mongoose.connection.on('error', () => {});
};

exports.createLeaderboard = () => {
    let _array = [];
    for (let i = 0; i < 10; i++) {
        _array.push({
          _id: '507c7f79bcf86cd7994f6c'+ (i + 10),
          userId: 'U1D3GQ0E7',
          teamId: 'T0R1Y67HQ',
          score: 0,
          createdAt: new Date()});
    }
    return Leaderboard.create(_array);
};
