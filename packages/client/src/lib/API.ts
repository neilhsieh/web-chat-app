import axios from 'axios';
import { setMe, getMe } from '../config';


class API {

  prefix = 'http://localhost:9999';

  login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${this.prefix}/auth/login/`, {
        email, password
      });
      return res.data;
    } catch (e) {
      return null;
    }
  }

  me = async () => {
    const me = this.request('get', '/me');
    setMe(me);
    return me;
  }

  getConversation = async (convoId: string) => {
    return this.request('get', `/conversations/${convoId}`);
    // try {
    //   const res = await axios.get(`${this.prefix}/conversations/${convoId}`);
    //   return res.data;
    // } catch (e) {
    //   return null;
    // }
  }

  getMessages = async (convoId: string) => {
    return this.request('get', `/conversations/${convoId}/messages`);
    // try {
    //   const res = await axios.get(`${this.prefix}/conversations/${convoId}/messages`);
    //   return res.data;
    // } catch (e) {
    //   return null;
    // }
  }

  createMessage = async (
    convoId: string,
    message: string,
  ) => {
    const uId = await getMe();
    // const userId = '09545d62-5d38-4ab7-b47f-74326ee7ff4d';
    return this.request('post', '/messages', {
      content: message,
      userId: uId!.id,
      conversationId: convoId,
    });
  }

  getConversations = async () => {
    return this.request('get', '/conversations');
    // try {
    //   const res = await axios.get(`${this.prefix}/conversations`);
    //   return res.data;
    // } catch (e) {
    //   return null;
    // }
  }

  createConvo = async (
    name: string
  ) => {
    return this.request('post', '/conversations', {
      name
    });
  }

  private async request(
    type: 'get' | 'post',
    url: string,
    data?: object
  ) {
    const headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`
    };

    try {
      let res: any;
      if (type === 'get') {
        res = await axios.get(`${this.prefix}${url}`, { headers });
      }

      if (type === 'post') {
        res = await axios.post(`${this.prefix}${url}`, data, {
          headers
        });
      }
      return res!.data;
    } catch (e) {
      return null;
    }
  }

}

export const api = new API();
