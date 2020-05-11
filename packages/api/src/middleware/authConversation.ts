import { RequestHandler } from 'express';
// import { UserConversation } from '../models/UserConversation';
import { checkUserConvo } from '../lib/checkUserConvo';

export const middlewareConvo: RequestHandler = async (req, res, next) => {
  const { conversationID } = req.params;
  const userId = res.locals.user.id;

  try {
    await checkUserConvo(userId, conversationID);
  } catch (e) {
    next(e);
  }

  // console.log('There is user', exists);
  // 
  next();
};
