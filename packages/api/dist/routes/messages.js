"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Message_1 = require("../models/Message");
exports.messagesRouter = express_1.Router();
// Create a message
exports.messagesRouter.post('/', async (req, res, next) => {
    try {
        const message = new Message_1.Message(req.body); // NOTE: THIS IS DANGEROUS
        await message.save();
        res.json(message);
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=messages.js.map