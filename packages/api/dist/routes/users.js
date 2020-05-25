"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const sequelize_1 = require("sequelize");
const Conversation_1 = require("../models/Conversation");
exports.usersRouter = express_1.Router();
// CRUD of the User in REST API
// Get list of users
exports.usersRouter.get('/', async (_req, res) => {
    // Fetch ALL the users
    const users = await User_1.User.findAll();
    // Send them in the pipe
    res.json(users);
});
// Get list of all users IN a convo
exports.usersRouter.get('/convoUsers/:convoId', async (req, res) => {
    const { convoId } = req.params;
    // Fetch ALL the users
    const users = await User_1.User.findAll({
        include: [{
                model: Conversation_1.Conversation,
                where: { id: convoId }
            }]
    });
    // Send them in the pipe
    res.json(users);
});
// Search for a user
exports.usersRouter.get('/search', async (req, res, next) => {
    const query = req.query.q;
    try {
        const users = await User_1.User.findAll({
            where: {
                firstName: {
                    [sequelize_1.Op.like]: `%${query}%`
                }
            }
        });
        res.json(users.map(u => ({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName
        })));
    }
    catch (e) {
        next(e);
    }
});
// Get ONE user by ID
exports.usersRouter.get('/:userID', async (req, res) => {
    const { userID } = req.params;
    const user = await User_1.User.findByPk(userID);
    res.json(user);
});
// // Create a user
// usersRouter.post('/', async (req, res, next) => {
//   try {
//     const { password: plainPass, ...userData } = req.body;
//     const salt = bcrypt.genSaltSync(10);
//     const password = bcrypt.hashSync(plainPass, salt);
//     const user = new User({
//       ...userData, password
//     }); // NOTE: THIS IS DANGEROUS
//     await user.save();
//     res.json(user);
//   } catch (e) {
//     next(e);
//   }
// });
// Update a user
exports.usersRouter.patch('/:userID', async (req, res, next) => {
    try {
        await User_1.User.update(req.body, {
            where: { id: req.params.userID },
            returning: true // TODO: Fix this
        });
        const user = await User_1.User.findByPk(req.params.userID);
        res.json(user);
    }
    catch (e) {
        next(e);
    }
});
// Update a user
exports.usersRouter.delete('/:userID', async (req, res, next) => {
    try {
        User_1.User.destroy({
            where: { id: req.params.userID }
        });
        res.json({
            message: 'Successfully deleted user'
        });
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=users.js.map