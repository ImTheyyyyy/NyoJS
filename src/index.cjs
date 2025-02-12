const Application = require('./application.js');
const logger = require('./middleware/logger.js');
const json = require('./middleware/json.js');
const errorHandler = require('./middleware/errorHandler.js');
const validate = require('./middleware/validate.js');
const cookies = require('./middleware/cookies.js');
const session = require('./middleware/session.js');
const serveStatic = require('./middleware/static.js');

module.exports = {
    NyoJS: Application,
    Logger: logger,
    Json: json,
    ErrorHandler: errorHandler,
    Validate: validate,
    Cookies: cookies,
    Session: session,
    ServeStatic: serveStatic
};