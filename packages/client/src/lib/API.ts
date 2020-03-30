import axios from 'axios';


class API {

  prefix = 'http://localhost:9999';

  getConversation = async (convoId: string) => {
    try {
      const res = await axios.get(`${this.prefix}/conversations/${convoId}`);
      return res.data;
    } catch (e) {
      return null;
    }
  }
  getMessages = async (convoId: string) => {
    try {
      const res = await axios.get(`${this.prefix}/conversations/${convoId}/messages`);
      return res.data;
    } catch (e) {
      return null;
    }
  }

  createMessage = async (
    convoId: string,
    message: string,
  ) => {

    const userId = '09545d62-5d38-4ab7-b47f-74326ee7ff4d';
    const res = await axios.post(`${this.prefix}/messages`, {
      content: message,
      conversationId: convoId,
      userId: userId
    });

    return res.data;
  }
}

export const api = new API();
