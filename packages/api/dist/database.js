"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dbOptions = {
    models: [__dirname + '/models'],
    logging: false
};
// Communicate to our database
// @ts-ignore
exports.sequelize = process.env.DATABASE_URL
    ? new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, dbOptions)
    : new sequelize_typescript_1.Sequelize({
        ...dbOptions,
        database: 'chat',
        dialect: 'sqlite',
        username: 'root',
        password: '',
        storage: 'chat.db'
    });
//# sourceMappingURL=database.js.map