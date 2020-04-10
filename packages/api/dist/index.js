"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./middleware/logger");
const auth_1 = require("./middleware/auth");
const users_1 = require("./routes/users");
const messages_1 = require("./routes/messages");
const database_1 = require("./database");
const body_parser_1 = __importDefault(require("body-parser"));
const conversations_1 = require("./routes/conversations");
const auth_2 = require("./routes/auth");
const me_1 = require("./routes/me");
const run = async () => {
    // Created an INSTANCE of an API
    const app = express_1.default();
    /**
     * Each middleware takes 3 parameters
     * 1. Request
     * 2. Response
     * 3. Next
     */
    // Returns a promise
    try {
        await database_1.sequelize.authenticate();
        await database_1.sequelize.sync(); // Sync changes to the database
        console.log('Successfully connected to database');
    }
    catch (e) {
        console.log('Could not connect to database');
        console.log(e);
    }
    // const users = await User.findAll();
    // console.log(users);
    // Use the middleware for ALL requests (Includes get, post, put, any url)
    app.use(cors_1.default());
    app.use(body_parser_1.default.json()); // for parsing application/json
    app.use(logger_1.middlewareLogger);
    // Defining a NEW PIPE
    app.use('/auth', auth_2.authRouter);
    app.use('/users', auth_1.middlewareAuth, users_1.usersRouter);
    app.use('/me', auth_1.middlewareAuth, me_1.meRouter);
    app.use('/conversations', auth_1.middlewareAuth, conversations_1.convoRouter);
    app.use('/messages', auth_1.middlewareAuth, messages_1.messagesRouter);
    // Running the web server on port 9999
    app.listen(9999);
    console.log('API running on http://localhost:9999');
};
run();
//# sourceMappingURL=index.js.map