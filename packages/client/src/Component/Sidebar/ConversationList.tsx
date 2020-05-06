import './conversation-list.scss';

import React, { useState, useEffect } from 'react';
import { Conversation } from '../../lib/types';

import { api } from '../../lib/API';
import { Link } from 'react-router-dom';
import { CreateConversation } from '../CreateConvo/CreateConversation';
import { Conversations } from '../../containers/conversations.container';

export const ConversationList = () => {

  const { conversations, loadConversations } = Conversations.useContainer();

  useEffect(() => {
    loadConversations();
  }, []);

  return <aside className="conversations-container">
    <h2><span>Your Convos</span></h2>
    <ul className="conversations">
      {conversations.map((convo, i) =>
        <li key={i} className={
          convo.id === window.location.href.split('/').pop() ? "selected" : ""
        }>
          <Link to={`/convo/${convo.id}`}>
            {convo.name}
          </Link>
        </li>
      )}
    </ul>
    <CreateConversation />
  </aside>
}
