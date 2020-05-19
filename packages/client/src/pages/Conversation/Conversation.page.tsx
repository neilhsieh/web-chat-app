import './conversation.page.scss';
import { Params, Conversation, Message } from '../../lib/types';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import { api } from '../../lib/API';
import { SendMessage } from './SendMessage';
import { ConversationList } from '../../Component/Sidebar/ConversationList';
import { CreateConversation } from '../../Component/CreateConvo/CreateConversation';

import { AddUser } from '../../Component/AddUser/AddUser';
import { joinRoom } from '../../lib/sockets';
import { Messages } from '../../containers/messages.container';
import { CurrentUser } from '../../containers/me.container';
import { ConvoOptions } from '../../Component/ConvoOptions/ConvoOption';

export const ConversationPage = () => {
  const params = useParams<Params>();

  const [convo, updateConvo] = useState<Conversation>();

  const { messages, loadMessages } = Messages.useContainer();
  const { me } = CurrentUser.useContainer();

  const loadInitialData = async () => {
    const conversation = await api.getConversation(params.conversationId);
    if (!conversation) return;
    // const messages = await api.getMessages(params.conversationId);
    updateConvo(conversation);
    loadMessages(params.conversationId);
  };

  useEffect(() => {
    loadInitialData();
    joinRoom(params.conversationId);
  }, [params.conversationId, me]
  );

  const convoMessages = useMemo(
    () => messages[params.conversationId] || [],
    [params.conversationId, messages]
  );

  return <div className="conversation-page">
    <ConversationList />
    {/* <CreateConversation /> */}
    <main className="conversation">
      <header>{convo
        ? <h1>{convo.name} </h1>
        : <h1>Conversation page</h1>}
        <div className="convo-options">

          < ConvoOptions />
          <AddUser />
        </div>
      </header>
      <ul className="messages">

        {convoMessages.map((message, i) =>
          <li key={i}
            className={message.userId === me?.id ? 'my-message' : ''}
          >
            <span>{message.content}</span>
          </li>
        )}
      </ul>
      <div className="new-message">
        <SendMessage
          conversationId={params.conversationId}
        />
      </div>
    </main>
  </div>
};
