import './conversation-list.scss';

import React, { useState, useEffect } from 'react';
import { Conversation } from '../../lib/types';

import { api } from '../../lib/API';

export interface CurrentMessageProps {
  currentConvo: (convo: Conversation) => void;
}

export const ConversationList: React.FC<CurrentMessageProps> = ({
  currentConvo
}) => {

  const [convos, updateConvos] = useState<Conversation[]>([]);

  const loadConversations = async () => {
    const conversations = await api.getConversations();
    if (!conversations) return;
    updateConvos(conversations);
  }

  useEffect(() => {
    loadConversations();
  }, []);

  return <aside className="conversations-container">
    <h2><span>Your Convos</span></h2>
    <ul className="conversations">
      {convos.map((convo, i) =>
        <li key={i} className={
          convo.id === window.location.href.split('/').pop() ? "selected" : ""
        }>
          <a href={`/convo/${convo.id}`} >
            {convo.name}
          </a>
        </li>
      )}
    </ul>
  </aside>
}