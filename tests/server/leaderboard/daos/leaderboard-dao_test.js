import mongoose from 'mongoose';
import leaderboardDAO from '../../../../server/api/leaderboard/dao/leaderboard-dao';
import {expect} from 'chai';
import {setupMongoose, createLeaderboard} from '../../_helpers/db';

describe('leaderboard.dao', () => {
  before(() => {
    setupMongoose(mongoose);
  });

  afterEach((done) => {
    leaderboardDAO.remove({}, () => done());
  });

  describe('getAll', () => {
    beforeEach((done) => {
      createLeaderboard()
        .then(() => done())
        .catch(() => done());
    });

    it('should get all leaderboard', (done) => {
      let _onSuccess = leaderboardItems => {
        expect(leaderboardItems).to.be.defined;
        expect(leaderboardItems[0]).to.have.property('score').and.to.be.a('number');
        expect(leaderboardItems[0]).to.have.property('createdAt').and.to.be.defined;
        done();
      };

      let _onError = (err) => {
        expect(true).to.be.false; // should not come here
      };

      leaderboardDAO
        .getAll()
        .then(_onSuccess)
        .catch(_onError);
    })
  });

  describe('createLeaderboard', () => {
    it('should throw an error, object passed is not defined', (done) => {
      let _undefinedLeaderboard = undefined;

      let _onSuccess = () => {
        expect(true).to.be.false; // should not come here;
      };

      let _onError = error => {
        expect(error).to.be.defined;

        done();
      };

      leaderboardDAO
        .createLeaderboard(_undefinedLeaderboard)
        .then(_onSuccess)
        .catch(_onError);
    });

    it('should create the todo correctly', (done) => {
      let _leaderboard = { userId: 'U1D3GQ0E7', teamId: 'T0R1Y67HQ', score: 15};

      let _onSuccess = leaderboard => {
        expect(leaderboard).to.be.defined;
        expect(leaderboard.score).to.be.a('number');
        expect(leaderboard.createdAt).to.be.an('object');

        done();
      };

      let _onError = () => {
        expect(true).to.be.false;
      };

      leaderboardDAO
        .createLeaderboard(_leaderboard)
        .then(_onSuccess)
        .catch(_onError);
    })
  });

  describe('incrementLeaderboard', () => {
    it('should increment the of a leaderboard', (done) => {

      let _onSuccess = (incrementedLeaderboard) => {
        expect(incrementedLeaderboard).to.be.defined;
        expect(incrementedLeaderboard).equals(1);
        done();
      };

      let _onError = (err) => {
        expect(err).to.be.defined;
        done();
      };

      leaderboardDAO
        .incrementScore('U1D3GQ0E7', 'T0R1Y67HQ')
        .then(_onSuccess)
        .catch(_onError);
    })
  })
});
