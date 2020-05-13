import { Router } from 'express';
import { Conversation } from '../models/Conversation';
import { middlewareConvo } from '../middleware/authConversation';
import { User } from '../models/User';

export const convoRouter = Router();

// Get a list of conversations
convoRouter.get('/', async (_req, res, _next) => {
  // fetch all conversations
  const userId = res.locals.user.id;

  const conversations = await Conversation.findAll({
    include: [{
      model: User,
      where: { id: userId }
    }]
  });

  // send through pipe
  res.json(conversations);
});

// Get one conversation
convoRouter.get('/:conversationID', middlewareConvo, async (req, res, _next) => {
  const { conversationID } = req.params;

  const conversation = await Conversation.findByPk(conversationID);
  res.json(conversation);
});

// Create a conversation
convoRouter.post('/', async (req, res, next) => {
  try {
    const conversation = new Conversation(req.body); // NOTE: THIS IS DANGEROUS
    await conversation.save();
    await conversation.$add('user', res.locals.user.id);
    res.json(conversation);
  } catch (e) {
    next(e);
  }
});

// Update conversation
convoRouter.patch('/:conversationID', middlewareConvo, async (req, res, next) => {
  try {
    await Conversation.update(req.body, {
      where: { id: req.params.conversationID },
      returning: true // TODO: Fix this
    });
    const conversation = await Conversation.findByPk(req.params.conversationID);
    res.json(conversation);
  } catch (e) {
    next(e);
  }
});

// Delete Conversation
convoRouter.delete('/:conversationID', middlewareConvo, async (req, res, next) => {
  try {
    Conversation.destroy({
      where: { id: req.params.conversationID }
    });
    res.json({
      message: 'Successfully deleted conversation'
    });
  } catch (e) {
    next(e);
  }
});

// Get list of messages in conversation
convoRouter.get('/:conversationID/messages', middlewareConvo, async (req, res, next) => {
  // Get Conversation
  const { conversationID } = req.params;
  const conversation = await Conversation.findByPk(conversationID);

  if (!conversation) return next(new Error('No conversations with that id'));
  // Get message in one to many relationship
  const messages = await conversation.$get('messages');
  res.json(messages);
});
