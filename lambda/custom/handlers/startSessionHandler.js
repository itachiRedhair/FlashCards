'use strict';
// TODO: reprompts, Quiz handler, HELP
const Alexa = require('alexa-sdk');

//constants import
const options = require("./../constants").options;
const questionList = require("./../constants").questionList;
const states = require("./../constants").states;

const startSessionHandlers = Alexa.CreateStateHandler(states.START, {
    'NewSession': function () {

        this.attributes['questionList'] = questionList;
        this.attributes['correctCount'] = 0;
        this.attributes['wrongCount'] = 0;
        this.attributes['wrongList'] = [];

        this.response.speak(this.t('WELCOME_LAUNCH')).listen(this.t("TITLE"));
        this.emit(':responseReady');

    },
    "PracticeIntent": function () {
        this.handler.state = states.PRACTICE;
        this.response.speak(this.t("WELCOME_PRACTICE", questionList.length))
            .listen(this.t("WELCOME_PRACTICE", questionList.length));
        this.emit(':responseReady');
    },
    "QuizIntent": function () {
        this.handler.state = states.QUIZ;
        this.response.speak(this.t("WELCOME_QUIZ", options.QUESTIONS_PER_QUIZ))
            .listen(this.t("WELCOME_QUIZ", options.QUESTIONS_PER_QUIZ));
        this.emit(':responseReady');
    },
    "AMAZON.HelpIntent": function () {
        this.response.speak(this.t("HELP_MESSAGE", questionList.length, options.QUESTIONS_PER_QUIZ))
            .listen(this.t("HELP_MESSAGE", questionList.length, options.QUESTIONS_PER_QUIZ));
        this.emit(':responseReady');
    },
    "AMAZON.CancelIntent": function () {
        this.response.speak("Goodbye!")
        this.emit(':responseReady');
    },
    "AMAZON.StopIntent": function () {
        this.response.speak("Goodbye!");
        this.emit(':responseReady');
    }

});

module.exports = startSessionHandlers;