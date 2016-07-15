"use strict";

const request = require('request-promise');
const Jimp = require('jimp');
const hash = require('hash-string');
const mkdirp = require('mkdirp');
const QuizService = require('../service/quiz-service');

const BASE_DIR = `${process.cwd()}/.temp/images`;
let imageCache = {};

mkdirp(BASE_DIR, function (err) {
  if (err) console.error(err);
  else console.log(`Created directory ${BASE_DIR}`);
});


module.exports = class QuizController {

  static getQuiz(req, res) {

    try {

      let token = QuizController.getTokenFromRequest(req, res);

      console.log('Quiz Controller - getQuiz');

      return QuizService.getQuiz(token)
        .then(quiz => res.status(200).json(quiz))
        .catch(error => QuizController.handleError(error, res));
    }
    catch(error){
      return QuizController.handleError(error, res);
    }
  }

  static answerQuiz(req, res){

    try {

      let token = QuizController.getTokenFromRequest(req, res);
      let quiz = QuizController.getQuizFromRequest(req, res);
      let answer = QuizController.getAnswerFromRequest(req, res);

      console.log('Quiz Controller - answerQuiz');

      return QuizService.answerQuiz(token, quiz, answer)
        .then(result => res.status(200).json(result))
        .catch(error => QuizController.handleError(error, res));
    }
    catch(error){
      return QuizController.handleError(error, res);
    }
  }

  static getQuizImage(req, res){

    try {

      let image = QuizController.getImageFromRequest(req, res);
      console.log('Quiz Controller - getQuizImage', image);

      return QuizService.getQuizImageUrl(image)
        //We need to slightly change the file so people cant cheat based on hashes of images!
        // .then(url => request(url).pipe(res))
        .then(url => {
          if(imageCache[url]){
            return imageCache[url];
          }
          else {
            imageCache[url] = `_${hash(url)}${url.indexOf('.png') ? '.png' : url.indexOf('.jpeg') ? '.jpeg' : '.jpg'}`;
            return new Promise((success, failure) => {

              Jimp.read(url, function (err, image) {
                if(err){
                  console.log('Error Jimping image', err);
                  return failure(err);
                }
                image.flip(true, false);
                image.write(`${BASE_DIR}/${imageCache[url]}`, (err) => {
                  if(err){
                    console.log('Error Writing image', err);
                    return failure(err);
                  }
                  return success(imageCache[url]);
                })
              });
            })
          }
        })
        .then(image => {
          res.sendFile(`${BASE_DIR}/${image}`);
        })
        .catch(error => QuizController.handleError(error, res));
    }
    catch(error){
      return QuizController.handleError(error, res);
    }

  }

  static handleError(error, res){
    console.error('Error in Quiz Controller', error);
    return res.status(400).json(error);
  }


  static getImageFromRequest(req, res){
    let image = req.params.image;
    if(! image){
      console.error('No image passed');
      res.status(400);
      throw new Error('No image passed ');
    }
    return image;
  }

  static getAnswerFromRequest(req, res){
    let answer = req.body.answer;
    if(! answer){
      console.error('No answer passed');
      res.status(400);
      throw new Error('No answer passed ');
    }
    return answer;
  }

  static getQuizFromRequest(req, res){
    let quiz = req.body.quiz;
    if(! quiz){
      console.error('No quiz passed');
      res.status(400);
      throw new Error('No quiz passed ');
    }
    return quiz;
  }

  static getTokenFromRequest(req, res){
    let token = req.headers.authorization;
    if(! token){
      console.error('No token passed');
      res.status(400);
      throw new Error('No token passed');
    }
    return token;
  }

};
