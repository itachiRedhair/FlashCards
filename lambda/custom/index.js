'use strict';
// TODO: reprompts, Quiz handler, HELP
const Alexa = require('alexa-sdk');

//constants import
const languageStrings = require("./constants").languageStrings;
const sessionTableName = require("./constants").sessionTableName;

//handlers import
const newSessionHandlers = require("./handlers/newSessionHandler");
const startSessionHandlers = require("./handlers/startSessionHandler");
const practiceHandlers = require("./handlers/practiceHandler");
const quizHandlers = require("./handlers/quizHandler");
const recapPracticeHandlers = require("./handlers/recapPracticeHandler");
const recapQuizHandlers = require("./handlers/recapQuizHandler");
const scoreHandlers = require("./handlers/scoreHandler");

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);

    alexa.resources = languageStrings;

    alexa.dynamoDBTableName = sessionTableName; // Dafuq! that's it?

    alexa.registerHandlers(
        newSessionHandlers,
        startSessionHandlers,
        practiceHandlers,
        quizHandlers,
        recapPracticeHandlers,
        recapQuizHandlers,
        scoreHandlers
    );
    alexa.execute();
};



