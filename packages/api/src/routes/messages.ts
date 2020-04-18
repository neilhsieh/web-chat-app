import { Router } from 'express';
import { Message } from '../models/Message';
import { checkUserConvo } from '../lib/checkUserConvo';

export const messagesRouter = Router();

// Create a message
messagesRouter.post('/', async (req, res, next) => {
  try {
    // console.log(res.locals.user.id, req.body.convoId)
    await checkUserConvo(res.locals.user.id, req.body.conversationId);
    const { content, userId, conversationId } = req.body;
    const message = new Message({ content, userId, conversationId }); // NOTE: THIS IS DANGEROUS
    await message.save();
    res.json(message);
  } catch (e) {
    next(e);
  }
});
