"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Conversation_1 = require("../models/Conversation");
exports.convoRouter = express_1.Router();
// Get a list of conversations
exports.convoRouter.get('/', async (_req, res, _next) => {
    // fetch all conversations
    const conversations = await Conversation_1.Conversation.findAll();
    // send through pipe
    res.json(conversations);
});
// Get one conversation
exports.convoRouter.get('/:conversationID', async (req, res, _next) => {
    const { conversationID } = req.params;
    const conversation = await Conversation_1.Conversation.findByPk(conversationID);
    res.json(conversation);
});
// Create a conversation
exports.convoRouter.post('/', async (req, res, next) => {
    try {
        const conversation = new Conversation_1.Conversation(req.body); // NOTE: THIS IS DANGEROUS
        await conversation.save();
        res.json(conversation);
    }
    catch (e) {
        next(e);
    }
});
// Update conversation
exports.convoRouter.patch('/:conversationID', async (req, res, next) => {
    try {
        await Conversation_1.Conversation.update(req.body, {
            where: { id: req.params.conversationID },
            returning: true // TODO: Fix this
        });
        const conversation = await Conversation_1.Conversation.findByPk(req.params.conversationID);
        res.json(conversation);
    }
    catch (e) {
        next(e);
    }
});
// Delete Conversation
exports.convoRouter.delete('/:conversationID', async (req, res, next) => {
    try {
        Conversation_1.Conversation.destroy({
            where: { id: req.params.conversationID }
        });
        res.json({
            message: 'Successfully deleted conversation'
        });
    }
    catch (e) {
        next(e);
    }
});
// Get list of messages in conversation
exports.convoRouter.get('/:conversationID/messages', async (req, res, next) => {
    // Get Conversation
    const { conversationID } = req.params;
    const conversation = await Conversation_1.Conversation.findByPk(conversationID);
    if (!conversation)
        return next(new Error('No conversations with that id'));
    // Get message in one to many relationship
    const messages = await conversation.$get('messages');
    res.json(messages);
});
//# sourceMappingURL=conversations.js.map