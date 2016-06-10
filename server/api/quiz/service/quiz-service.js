"use strict";

const request = require('request-promise');
const crypto = require('crypto');
const secret = 'abcdefg';
const uuid = require('uuid');
const leaderboardService = require('../../leaderboard/service/leaderboard-service');

const MEMBERS_CACHE_TIMEOUT = 5 * 60 * 1000; // 5mins

let membersCache = [];
let membersCacheTs = 0;

let answerCache = {};

module.exports = class QuizService {

  static getQuiz(token){
    return QuizService.getMembers(token)
      .then(members => {

        let answer = QuizService.getAnswer(members);
        let options = QuizService.getOptions(answer, members);

        return {
          type: 'avatar',
          id: answer.answerId,
          question: answer.image,
          answer: answer.answer,
          options: options
        };
      });
  }

  static answerQuiz(token, quiz, answer){

    return Promise.resolve()
    .then(()=> {

      console.log('Quiz Service answer Quiz', quiz.id, answer);

      if(answerCache[quiz.id]){
        //TODO do we want to deny this??
        console.log('Quiz already answered');
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
              return leaderboardService.reduceScore(token);
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
        if(QuizService.isMembersCache()){
          return membersCache;
        }
        else{
          return request.get(`https://slack.com/api/users.list?token=${token}`)
            .then(response => JSON.parse(response))
            .then(responseJson => responseJson.members)
            .then(members => {
              membersCacheTs = Date.now();
              return membersCache = members;
            });
        }
      });
  }

  static isMembersCache(){
    return membersCache && membersCacheTs &&
      (Date.now() - membersCacheTs < MEMBERS_CACHE_TIMEOUT);
  }


  static getAnswer(members){

    let randomMember = QuizService.getRandomUserFromList(members.filter(member => {
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
      id: user.id
    }
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
