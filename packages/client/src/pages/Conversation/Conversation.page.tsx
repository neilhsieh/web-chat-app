import './conversation.page.scss';
import { Params, Conversation, Message } from '../../lib/types';

import React, { useState, useEffect, useMemo, useRef, FormEvent } from 'react';
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
import { MobileSidebar } from '../../containers/mobileSidebar.container';

export const ConversationPage = () => {
  const params = useParams<Params>();
  const convoMessagesContainer = useRef();

  const [convo, updateConvo] = useState<Conversation>();

  const { messages, loadMessages } = Messages.useContainer();
  const { me } = CurrentUser.useContainer();
  const { mobileToggle, toggleSidebar } = MobileSidebar.useContainer();

  const loadInitialData = async () => {
    const conversation = await api.getConversation(params.conversationId);
    if (!conversation) return;
    // const messages = await api.getMessages(params.conversationId);
    updateConvo(conversation);
    loadMessages(params.conversationId);
  };

  useEffect(() => {
    console.log('updated');

    loadInitialData();
    joinRoom(params.conversationId);
    // snapToNewestMessage();
  }, [params.conversationId, me]
  );

  useEffect(() => {
    snapToNewestMessage();

  }, [messages]);

  const convoMessages = useMemo(
    () => messages[params.conversationId] || [],
    [params.conversationId, messages]
  );

  const snapToNewestMessage = () => {
    const lastChild = convoMessagesContainer?.current?.querySelector('li:last-child');
    lastChild?.scrollIntoView();
  };


  return <div className="conversation-page">

    <ConversationList mToggle={{ mobileToggle, mobileToggleFunc: toggleSidebar }} />
    {/* <CreateConversation /> */}
    <main className="conversation">
      <header>
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <i className="far fa-comments"></i>
        </button>
        {convo
          ? <h1>{convo.name} </h1>
          : <h1>Conversation page</h1>}
        <div className="convo-options">

          < ConvoOptions />
          <AddUser />
        </div>
      </header>
      <ul className="messages" ref={convoMessagesContainer}>

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
