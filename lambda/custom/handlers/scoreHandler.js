'use strict';
// TODO: reprompts, Quiz handler, HELP
const Alexa = require('alexa-sdk');

const scoreHandlers = {
    'rateAnswer': function (stateGuess, callback) {
        var say = '';
        var currentQuestionIndex = this.attributes['currentQuestionIndex'];
        var currentQuestion = this.attributes['sessionQuestionList'][currentQuestionIndex];
        if (currentQuestion.answer.indexOf(stateGuess) >= 0 ) {
            this.attributes['correctCount'] += 1;

            say =  stateGuess + ' is right! ';

        } else {

            this.attributes['wrongCount'] += 1;

            var wrongList = this.attributes['wrongList'];
            wrongList.push(currentQuestion);
            this.attributes['wrongList'] = wrongList;

            say =  stateGuess + ' is wrong! '
                + currentQuestion.question
                + ' is in '
                + currentQuestion.answer[0] + '. ';

        }
        currentQuestionIndex += 1;
        this.attributes['currentQuestionIndex'] = currentQuestionIndex;

        callback(say);
    },


};
module.exports = scoreHandlers;