"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Conversation_1 = require("../models/Conversation");
const authConversation_1 = require("../middleware/authConversation");
const User_1 = require("../models/User");
exports.convoRouter = express_1.Router();
// Get a list of conversations
exports.convoRouter.get('/', async (_req, res, _next) => {
    // fetch all conversations
    const userId = res.locals.user.id;
    const conversations = await Conversation_1.Conversation.findAll({
        include: [{
                model: User_1.User,
                where: { id: userId }
            }]
    });
    // send through pipe
    res.json(conversations);
});
// Get one conversation
exports.convoRouter.get('/:conversationID', authConversation_1.middlewareConvo, async (req, res, _next) => {
    const { conversationID } = req.params;
    const conversation = await Conversation_1.Conversation.findByPk(conversationID);
    res.json(conversation);
});
// Create a conversation
exports.convoRouter.post('/', async (req, res, next) => {
    try {
        const conversation = new Conversation_1.Conversation(req.body); // NOTE: THIS IS DANGEROUS
        await conversation.save();
        await conversation.$add('user', res.locals.user.id);
        res.json(conversation);
    }
    catch (e) {
        next(e);
    }
});
// Update conversation
exports.convoRouter.patch('/:conversationID', authConversation_1.middlewareConvo, async (req, res, next) => {
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
exports.convoRouter.delete('/:conversationID', authConversation_1.middlewareConvo, async (req, res, next) => {
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
exports.convoRouter.get('/:conversationID/messages', authConversation_1.middlewareConvo, async (req, res, next) => {
    // Get Conversation
    const { conversationID } = req.params;
    const conversation = await Conversation_1.Conversation.findByPk(conversationID);
    if (!conversation)
        return next(new Error('No conversations with that id'));
    // Get message in one to many relationship
    const messages = await conversation.$get('messages');
    res.json(messages);
});
// Add a user to conversastion
exports.convoRouter.post('/:conversationID/add-user', authConversation_1.middlewareConvo, async (req, res, next) => {
    const { userId } = req.body;
    // Get Conversation
    const { conversationID } = req.params;
    const conversation = await Conversation_1.Conversation.findByPk(conversationID);
    if (!conversation)
        return next(new Error('No conversations with that id'));
    // Add user to convo
    await conversation.$add('user', userId);
    res.json({
        data: true
    });
});
//# sourceMappingURL=conversations.js.map