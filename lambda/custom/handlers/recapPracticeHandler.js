'use strict';
// TODO: reprompts, Quiz handler, HELP
const Alexa = require('alexa-sdk');

var pluralize=require("./../utilities/helper").pluralize;
const states=require("./../constants").states;

//constants import
const options=require("./../constants").options;

const recapPracticeHandlers = Alexa.CreateStateHandler(states.RECAP_PRACTICE, {
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    'RecapSession': function (say) {  // append final results to previous answer result

        say = say + ' You are done. You got '
            + this.attributes['correctCount']
            + ' right out of '
            + this.attributes['sessionQuestionList'].length + '. ';

        if (this.attributes['wrongCount'] == 0) {
            say += ' Great job!  You can say stop if you are done. Would you like to try the Quiz now? ';
            this.response.speak(say).listen(say);
            this.emit(':responseReady');

        } else {
            say = say   +  ' I have sent the '
                        + pluralize('question', this.attributes['wrongCount'])
                        + ' you got wrong to the Alexa app on your phone. ';
            say += ' Would you like to practice this list again now? ';

            var cardText = '';
            var wrongList = this.attributes['wrongList'];
            for (var i = 0; i < wrongList.length; i++) {
                cardText += '\n\nQuestion : ' + wrongList[i].question;
                cardText += '\nAnswer   : ' + wrongList[i].answer[0];  // show the first acceptable answer
            }

            this.response.cardRenderer('Flash Cards to Practice', cardText);
            this.response.speak(say).listen('You can say yes to practice, or say no to quit.');
            this.emit(':responseReady');
        }

    },
    'AMAZON.YesIntent': function () {
        if (this.attributes['wrongCount'] == 0) {
            this.handler.state = states.QUIZ;
            this.emitWithState('AMAZON.YesIntent');

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
module.exports = recapPracticeHandlers;