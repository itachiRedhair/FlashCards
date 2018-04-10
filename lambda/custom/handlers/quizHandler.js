'use strict';
// TODO: reprompts, Quiz handler, HELP
const Alexa = require('alexa-sdk');

var randomizeArray=require("./../utilities/helper").randomizeArray;
const states=require("./../constants").states;

//constants import
const options=require("./../constants").options;

const quizHandlers = Alexa.CreateStateHandler(states.QUIZ, {
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    'AMAZON.YesIntent': function () {

        var say = '';

        this.attributes['currentQuestionIndex'] = 0;

        this.attributes['wrongCount'] = 0;
        this.attributes['correctCount'] = 0;

        this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['questionList'], options.QUESTIONS_PER_QUIZ);

        say = 'where is ' + this.attributes['sessionQuestionList'][0].question + '?';

        this.response.speak('First question, ' + say).listen('First question, ' + say);
        this.emit(':responseReady');

    },
    'AnswerIntent': function() {
        var myState = '';

        if ( !this.event.request.intent.slots.usstate || this.event.request.intent.slots.usstate.value == '') {
            this.emitWithState('AMAZON.HelpIntent');  // emitWithState = local version of this handler

        } else {
            myState = this.event.request.intent.slots.usstate.value;

            this.emit('rateAnswer', myState, (say) => {
                var currentQuestionIndex = this.attributes['currentQuestionIndex'];

                if (currentQuestionIndex < this.attributes['sessionQuestionList'].length) {  // MORE QUESTIONS

                    say = say +  ' Next question, where is ' + this.attributes['sessionQuestionList'][currentQuestionIndex].question + '? ';

                    this.response.speak(say).listen(say);
                    this.emit(':responseReady');

                } else {   // YOU ARE DONE
                    this.handler.state = states.RECAP_QUIZ;
                    this.emitWithState('RecapSession', say);
                }
            });
        }
    },
    'AMAZON.NoIntent': function() {
        this.response.speak('Okay, see you next time, goodbye!')
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function() {
        this.response.speak('Okay, see you next time, goodbye!');
        this.emit(':responseReady');
    },
    'Unhandled': function() {
        this.response.speak('Sorry, I didn\'t get that. Try again.').listen('Try again.');
        this.emit(':responseReady');
    }
});
module.exports = quizHandlers;