"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Message_1 = require("../models/Message");
const checkUserConvo_1 = require("../lib/checkUserConvo");
const sockets_1 = require("../lib/sockets");
exports.messagesRouter = express_1.Router();
// Create a message
exports.messagesRouter.post('/', async (req, res, next) => {
    try {
        // console.log(res.locals.user.id, req.body.conversationId);
        await checkUserConvo_1.checkUserConvo(res.locals.user.id, req.body.conversationId);
        const { content, userId, conversationId } = req.body;
        const message = new Message_1.Message({ content, userId, conversationId }); // NOTE: THIS IS DANGEROUS
        await message.save();
        res.json(message);
        sockets_1.messageRoom(conversationId, message);
    }
    catch (e) {
        next(e);
    }
});
//# sourceMappingURL=messages.js.map