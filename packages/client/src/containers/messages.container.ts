import { createContainer } from "unstated-next"
import { useState, useEffect } from "react";
import { Message } from "../lib/types";
import { api } from "../lib/API";
import { adminSocket } from "../lib/sockets";

interface Messages {
  [key: string]: Message[];
}
export const Messages = createContainer(() => {

  const [messages, setMessages] = useState<Messages>({});

  const loadMessages = async (convoId: string) => {
    const convoMessages = await api.getMessages(convoId);
    setMessages(messages => ({
      ...messages, ...{ [convoId]: convoMessages }
    }));
  };

  const socketAddMessage = async (m: Message) => {
    setMessages(messages => {
      const convoMessages = messages[m.conversationId] || [];
      convoMessages.push(m);
      return { ...messages, ...{ [m.conversationId]: convoMessages } }

    });
  };

  const createMessage = async (convoId: string, message: string) => {
    const newMessage = await api.createMessage(convoId, message);
    // setMessages(messages => [...messages, newMessage]);
    // setMessages(messages => ({
    //   ...messages, ...{ [convoId]: convoMessages }
    // }))
    // setMessages(messages => {
    //   const convoMessages = messages[convoId] || [];

    // });
    return newMessage;
  };

  useEffect(() => {
    adminSocket.on('message', (m: any) => {
      socketAddMessage(m);
    });
  }, []);

  return {
    messages,
    loadMessages,
    createMessage
  };
});
