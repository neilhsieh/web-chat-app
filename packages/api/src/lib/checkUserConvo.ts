import { UserConversation } from '../models/UserConversation';

export const checkUserConvo = async (userId: string, conversationId: string) => {
  console.log('checking user and convo', userId, conversationId);

  const exists = await UserConversation.findOne({
    where: {
      userId,
      conversationId
    }
  });

  if (!exists) throw new Error('You do not have permission to that conversation');
  return true;
};
