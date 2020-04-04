"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
// Communicate to our database
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: 'chat',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: 'chat.db',
    models: [__dirname + '/models'],
    logging: false
});
//# sourceMappingURL=database.js.map