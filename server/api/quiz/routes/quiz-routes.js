"use strict";

const QuizController = require('../controller/quiz-controller');

module.exports = class QuizRoutes {
    static init(router) {
      router
        .route('/api/quiz/:token')
        .get(QuizController.getQuiz)
        .post(QuizController.answerQuiz);

    }
};
