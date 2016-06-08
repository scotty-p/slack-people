"use strict";


const QuizService = require('../service/quiz-service');

module.exports = class QuizController {
  static getQuiz(req, res) {

    let token = req.params.token;
    if(! token){
      console.error('No token passed to get quiz')
      return res.status(400);
    }


    return QuizService.getQuiz(token)
      .then(quiz => res.status(200).json(quiz))
      .catch(error => res.status(400).json(error));

  }


  static answerQuiz(req, res){

  }


};
