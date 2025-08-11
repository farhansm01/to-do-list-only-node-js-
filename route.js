
const {taskHandler} = require('./handlers/taskHandler');
const {pingHandler} = require('./handlers/pingHandler');


const route = {
    'tasks' : taskHandler,
    'ping' : pingHandler
}

module.exports = route;