import axios from 'axios';
import { setMe, getMe } from '../config';


class API {

  prefix = 'http://localhost:9999';

  deleteConvo = async (url: string) => {
    const headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`
    };

    const res = await axios.delete(`${this.prefix}${url}`, {
      headers
    });
    return res;
  }

  createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const res = this.request('post', '/auth/signup', {
        firstName, lastName, email, password
      });
      return res;
    } catch (e) {
      console.log('error', e)
      return e;
    }
  }

  searchUser = async (queryString: string) => {
    return this.request('get', `/users/search?q=${queryString}`);
  }

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
  }

  getMessages = async (convoId: string) => {
    return this.request('get', `/conversations/${convoId}/messages`);
  }

  createMessage = async (
    convoId: string,
    message: string,
  ) => {
    const uId = await getMe();
    console.log(uId);

    // const userId = '09545d62-5d38-4ab7-b47f-74326ee7ff4d';
    return this.request('post', '/messages', {
      content: message,
      userId: uId!.id,
      conversationId: convoId,
    });
  }

  addUserToConvo = async (conversationId: string, userId: string) => {
    return this.request('post', `/conversations/${conversationId}/add-user`, { userId });
  }

  getConversations = async () => {
    return this.request('get', '/conversations');
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
