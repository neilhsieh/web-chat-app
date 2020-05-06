import './conversation.page.scss';
import { Params, Conversation, Message } from '../../lib/types';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { api } from '../../lib/API';
import { SendMessage } from './SendMessage';
import { ConversationList } from '../../Component/Sidebar/ConversationList';
import { CreateConversation } from '../../Component/CreateConvo/CreateConversation';

import { AddUser } from '../../modals/AddUserToConvo/AddUser';

export const ConversationPage = () => {
  const params = useParams<Params>();

  const [convo, updateConvo] = useState<Conversation>();
  const [messages, updateMessages] = useState<Message[]>([]);
  // const [currentConvo, updateCurrentConvo] = useState<Conversation>();

  const loadInitialData = async () => {
    const conversation = await api.getConversation(params.conversationId);
    if (!conversation) return;
    const messages = await api.getMessages(params.conversationId);
    updateConvo(conversation);
    updateMessages(messages);
  };

  useEffect(() => {
    loadInitialData();
  }, [params.conversationId]);

  return <div className="conversation-page">
    <ConversationList />
    {/* <CreateConversation /> */}
    <main className="conversation">
      <header>{convo
        ? <h1>{convo.name} </h1>
        : <h1>Conversation page</h1>}
        <AddUser />
      </header>
      <ul className="messages">

        {messages.map((message, i) =>
          <li key={i} >
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
  </div>
};
