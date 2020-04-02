import React, { useState, useEffect } from 'react';
import { Conversation } from '../../lib/types';

import { api } from '../../lib/API';

export const ConversationList = () => {

  const [convos, updateConvos] = useState<Conversation[]>([]);

  const loadConversations = async () => {
    const conversations = await api.getConversations();
    if (!conversations) return;
    updateConvos(conversations);
  }

  useEffect(() => {
    loadConversations();
  }, []);

  return <div className="conversations-container">
    <h2><span>Your Chats</span></h2>
    <ul className="conversations">
      {convos.map(convo =>
        <li>
          <a href={`/convo/${convo.id}`}>
            {convo.name}
          </a>
        </li>
      )}
    </ul>
  </div>
}