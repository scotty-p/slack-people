"use strict";

const request = require('request-promise');

module.exports = class QuizService {

  static getQuiz(token){

    return request.get(`https://slack.com/api/users.list?token=${token}`)
      .then(response => JSON.parse(response))
      .then(responseJson => responseJson.members)
      .then(members => {


        //TODO ignore users with an avatar from the https://secure.gravatar.com/avatar/ domain
        let answer = QuizService.getRandomUserFromList(members.filter(member => {
            return member.profile.image_192.indexOf('https://secure.gravatar.com/avatar/') === -1;
          }));

        let options = QuizService.shuffleArray([1, 2, 3].map(() => {
            return QuizService.getRandomUserFromList(members);
          }).concat(answer)).map(user => {
            return {
              name: user.real_name || user.name
            }
          });

        return {
          type: 'avatar',
          question: answer.profile.image_192,
          answer: answer.id, //TODO encrypt or just SHA-1
          options: options
        };
      });

  }

  static getRandomUserFromList(users){
    return users[Math.floor(Math.random()*users.length)];
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
