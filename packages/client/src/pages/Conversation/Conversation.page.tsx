import './conversation.page.scss';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { api } from '../../lib/API';
import { SendMessage } from './SendMessage';

// interface Conversation {
//   name: string;
//   id: string;
// };

// interface Params {
//   conversationId: string;
// };

// interface Message {
//   content: string;
//   userId: string;
// }

export const ConversationPage = () => {
  const params = useParams<Params>();

  const [convo, updateConvo] = useState<Conversation>();
  const [messages, updateMessages] = useState<Message[]>([]);

  const loadInitialData = async () => {
    const conversation = await api.getConversation(params.conversationId);
    const messages = await api.getMessages(params.conversationId);
    if (!conversation) return;
    updateConvo(conversation);
    updateMessages(messages);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return <main className="conversation">
    <header>{convo
      ? <h1>{convo.name} </h1>
      : <h1>Conversation page</h1>}
    </header>
    <ul className="messages">
      {messages.map((message, i) =>
        <li key={i}>
          <span>{message.content}</span>
        </li>
      )}
    </ul>
    <div className="new-message">
      <SendMessage
        conversationId={params.conversationId}
        onNewMessage={message => {
          updateMessages(m => [...m, message]);
        }}
      />
    </div>
  </main>
};