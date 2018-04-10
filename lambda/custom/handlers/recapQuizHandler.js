'use strict';
// TODO: reprompts, Quiz handler, HELP
const Alexa = require('alexa-sdk');

//constants import
const options=require("./../constants").options;
const states=require("./../constants").states;

const recapQuizHandlers = Alexa.CreateStateHandler(states.RECAP_QUIZ, {
    // 'NewSession': function () {
    //     this.emit('NewSession'); // Uses the handler in newSessionHandlers
    // },
    'RecapSession': function (say) {  // append final results to previous answer result
        var scoreSummary = '';
        scoreSummary += 'You got '
            + this.attributes['correctCount']
            + ' right out of '
            + this.attributes['sessionQuestionList'].length
            + ', for a score of '
            +  Math.floor((100.0 *  this.attributes['correctCount'] / this.attributes['sessionQuestionList'].length)).toString()
            + ' % . ';

        say =  say + ' You are done. '
            + scoreSummary.replace('\n','')
            + ' I have sent this result to the Alexa App on your phone. ';


        if (this.attributes['wrongCount'] == 0) {
            say += ' Great job!  You can say stop if you are done. Would you like to start over? ';
        } else {
            say += ' Would you like to practice some more now? ';
        }

        this.response.cardRenderer(options.TITLE +  ' Flash Cards - Quiz Result', scoreSummary);
        this.response.speak(say, 'Say yes to practice, or say no to quit.');
        this.emit(':responseReady');
    },

    'AMAZON.YesIntent': function () {
        if (this.attributes['wrongCount'] == 0) {

            this.handler.state = states.START;
            this.emitWithState('NewSession');

        } else {
            this.handler.state = states.PRACTICE;
            this.emitWithState('AMAZON.YesIntent');
        }

    },
    'AMAZON.NoIntent': function () {  //
        var say = 'Okay, see you next time, goodbye!';
        this.response.speak(say);
        this.emit(':responseReady');
    },
    'Unhandled': function() {
        this.response.speak('Sorry, I didn\'t get that. Try again.').listen('Try again.');
        this.emit(':responseReady');
    }
});
module.exports = recapQuizHandlers;