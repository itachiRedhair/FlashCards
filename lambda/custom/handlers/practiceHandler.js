'use strict';
// TODO: reprompts, Quiz handler, HELP
const Alexa = require('alexa-sdk');

var randomizeArray=require("./../utilities/helper").randomizeArray;
const states=require("./../constants").states;

const practiceHandlers = Alexa.CreateStateHandler(states.PRACTICE, {
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    'AMAZON.YesIntent': function() {  // Yes, I want to start the practice

        var say = '';

        this.attributes['currentQuestionIndex'] = 0;

        if (this.attributes['wrongList'].length > 0) {  // we have taken the practice already and need to repeat
            this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['wrongList']);  // only practice those answered wrong
            this.attributes['wrongList'] = [];
            this.attributes['wrongCount'] = 0;
            this.attributes['correctCount'] = 0;
        } else {
            this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['questionList']);
        }
        say = 'First question of ' + this.attributes['sessionQuestionList'].length + ', '
        say += 'Where is ' + this.attributes['sessionQuestionList'][0].question + '?';

        this.response.speak(say).listen(say);
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

                    this.handler.state = states.RECAP_PRACTICE;
                    this.emitWithState('RecapSession', say);
                }

            });
        }

    },

    'AMAZON.StopIntent': function () {
        this.response.speak('Goodbye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {  // practice help
        var helpText = 'please say the name of a U.S. State, such as Florida.';
        this.response.speak(helpText);
        this.emit(':responseReady');
    },

    'Unhandled': function() {  // if we get any intents other than the above
        this.response.speak('Sorry, I didn\'t get that.').listen('Try again');
        this.emit(':responseReady');
    }
});
module.exports = practiceHandlers;