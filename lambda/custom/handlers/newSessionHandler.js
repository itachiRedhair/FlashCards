//constants import
const states=require("./../constants").states;

const newSessionHandlers = {
    'NewSession': function () {
        this.handler.state = states.START;
        this.emitWithState('NewSession');
    }
};

module.exports = newSessionHandlers;

