"use strict";

const request = require('request-promise');
const crypto = require('crypto');
const secret = 'abcdefg';
const uuid = require('uuid');
const leaderboardService = require('../../leaderboard/service/leaderboard-service');
const sha1 = require('sha1');

const MEMBERS_CACHE_TIMEOUT = 5 * 60 * 1000; // 5mins

let membersCache = {};
let membersCacheTs = {};

let questionCache = {};

let answerCache = {};

module.exports = class QuizService {

  static getQuiz(token){
    return QuizService.getMembers(token)
      .then(members => {

        let answer = QuizService.getAnswer(token, members);
        let options = QuizService.getOptions(answer, members);

        return Math.random() < 0.5 ? QuizService.getAvatarQuiz(answer, options) : QuizService.getNameQuiz(answer, options);
      })
      .then(quiz => {

        return leaderboardService.getScore(token)
          .then(currentScore => {
            return Object.assign({}, quiz, {currentScore});
          })
      });
  }

  static getAvatarQuiz(answer, options){
    return {
      type: 'avatar',
      id: answer.answerId,
      question: {
        image: answer.image
      },
      answer: answer.answer,
      options: options.map(option => {
        return {
          id: option.id,
          name: option.name
        }
      })
    };
  }

  static getNameQuiz(answer, options){
    return {
      type: 'name',
      id: answer.answerId,
      question: {
        name: answer.name
      },
      answer: answer.answer,
      options: options.map(option => {
        return {
          id: option.id,
          image: option.image
        }
      })
    };
  }


  static answerQuiz(token, quiz, answer){

    return Promise.resolve()
    .then(()=> {

      console.log('Quiz Service answer Quiz', quiz.id, answer);

      if(answerCache[quiz.id]){
        console.error('Quiz already answered', quiz.id);
        throw new Error('Quiz already answered');
      }

      answerCache[quiz.id] = true;
      let encryptedAnswer = QuizService.getEncryptedAnswer(quiz.id, answer);

      return quiz.answer === encryptedAnswer;
    })
      .then(correct => {

        let result = quiz.options.find(option => {
          return quiz.answer === QuizService.getEncryptedAnswer(quiz.id, option && option.id);
        });

        return Promise.resolve()
          .then(() => {
            if(correct){
              return leaderboardService.addScore(token);
            }
            else {
              return leaderboardService.finishScore(token);
            }
          })
          .then((currentScore) => {
            return {
              currentScore,
              correct,
              answer: result
            };
          });
      });

  }

  static getMembers(token){

    return Promise.resolve()
      .then(() => {

        if(QuizService.isMembersCache(token)){
          return QuizService.getMembersCache(token);
        }
        else{
          return request.get(`https://slack.com/api/users.list?token=${token}`)
            .then(response => JSON.parse(response))
            .then(responseJson => responseJson.members)
            .then(members => {
              return QuizService.saveMembersCache(token, members);
            });
        }
      });
  }

  static saveMembersCache(token, members){
    let sha1Token = QuizService.getSha1Token(token);
    membersCacheTs[sha1Token] = Date.now();
    return membersCache[sha1Token] = members;
  }

  static getMembersCache(token){
    let sha1Token = QuizService.getSha1Token(token);
    return membersCache[sha1Token];
  }

  static isMembersCache(token){

    let sha1Token = QuizService.getSha1Token(token);

    return membersCache[sha1Token] && membersCacheTs[sha1Token] &&
      (Date.now() - membersCacheTs[sha1Token] < MEMBERS_CACHE_TIMEOUT);
  }

  static getSha1Token(token){
    return sha1(token);
  }


  static getAnswer(token, members){

    let randomMember = QuizService.getPseudoRandomUserFromList(token, members.filter(member => {
      return member.profile.image_192.indexOf('https://secure.gravatar.com/avatar/') === -1;
    }));

    let quizId = uuid.v4();
    let encryptedAnswer = QuizService.getEncryptedAnswer(quizId, randomMember.id);

    return {
      answerId: quizId,
      image: randomMember.profile.image_192,
      name: QuizService.getUserName(randomMember),
      answer: encryptedAnswer,
      id: randomMember.id
    };
  }

  static getEncryptedAnswer(quizId, userId){
    console.log('getEncryptedAnswer', quizId, userId);
    return crypto.createHmac('sha256', secret)
      .update(quizId + userId)
      .digest('hex');
  }

  static getOptions(answer, members){

    let options = [answer];
    while(options.length < 4){
      options = options
        .concat(QuizService.getRandomUserFromList(members))
        .filter((() => {
          let seen = {};
          if(members.length <= 4){
            return () => true;
          }
          return (member) => {
            return ! seen[member.id] && (seen[member.id] = true);
          };
        })());
    }

    return QuizService.shuffleArray(options)
      .map(user => QuizService.getUserAsOption(user));
  }

  static getUserAsOption(user){
    return {
      name: QuizService.getUserName(user),
      image: user.image || user.profile.image_192,
      id: user.id
    }
  }

  static getPseudoRandomUserFromList(token, users){

    let sha1Token = QuizService.getSha1Token(token);

    let pickedIndexes = questionCache[sha1Token] = questionCache[sha1Token] || [];

    let randomIndex = Math.floor(Math.random()*users.length);
    let i = 0;
    while(pickedIndexes.indexOf(randomIndex) !== -1){
      randomIndex = Math.floor(Math.random()*users.length);
      if(i++ >= users.length){
        questionCache[sha1Token] = [];
        break;
      }
    }

    pickedIndexes.push(randomIndex);

    return users[randomIndex];
  }

  static getRandomUserFromList(users){
    return users[Math.floor(Math.random()*users.length)];
  }

  static getUserName(user){
    return user.real_name || user.name;
  }

  static shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

};
