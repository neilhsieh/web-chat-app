"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
exports.usersRouter = express_1.Router();
// CRUD of the User in REST API
// Get list of users
exports.usersRouter.get("/", async (_req, res) => {
    // Fetch ALL the users
    const users = await User_1.User.findAll();
    // Send them in the pipe
    res.json(users);
});
// Get ONE user
exports.usersRouter.get("/:userID", async (req, res) => {
    const { userID } = req.params;
    const user = await User_1.User.findByPk(userID);
    res.json(user);
});
// Create a user
exports.usersRouter.post("/", async (req, res, next) => {
    try {
        const user = new User_1.User(req.body); // NOTE: THIS IS DANGEROUS
        await user.save();
        res.json(user);
    }
    catch (e) {
        next(e);
    }
});
// Update a user
exports.usersRouter.patch("/:userID", async (req, res, next) => {
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
exports.usersRouter.delete("/:userID", async (req, res, next) => {
    try {
        User_1.User.destroy({
            where: { id: req.params.userID }
        });
        res.json({
            message: "Successfully deleted user"
        });
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=users copy.js.map