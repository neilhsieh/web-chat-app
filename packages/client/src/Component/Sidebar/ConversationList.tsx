import './conversation-list.scss';

import React, { useState, useEffect } from 'react';
import { Conversation } from '../../lib/types';

import { api } from '../../lib/API';
import { Link } from 'react-router-dom';
import { CreateConversation } from '../CreateConvo/CreateConversation';
import { Conversations } from '../../containers/conversations.container';
import { getMe } from '../../config';
import { CurrentUser } from '../../containers/me.container';

interface MobileToggleProp {
  mToggle: { mobileToggle: boolean, mobileToggleFunc: () => void } | null;
}

export const ConversationList: React.FC<MobileToggleProp> = ({ mToggle }) => {

  const { conversations, loadConversations } = Conversations.useContainer();
  const [mobileToggle, setMobileToggle] = useState<boolean>();

  // const [me, setMe] = useState<string>();
  const { me } = CurrentUser.useContainer();

  useEffect(() => {
    mToggle && setMobileToggle(mToggle.mobileToggle);
  }, [mToggle?.mobileToggle]);

  useEffect(() => {
    loadConversations();
  }, []);

  const closeMobileSidebar = () => {
    if (window.innerWidth > 769) return;
    mToggle.mobileToggleFunc();
  };

  return <aside className={`conversations-container ${mobileToggle && `slide-in`}`}>
    <div className="sidebar-header">
      <h2><span>{me?.firstName ? `${me.firstName}'s Convos` : null} </span></h2>
      {mobileToggle &&
        <button className="sidebar-close-btn" onClick={mToggle.mobileToggleFunc}><i className="fas fa-times"></i></button>
      }
    </div>
    <ul className="conversations">
      {conversations.map((convo, i) =>
        <li key={i} className={
          convo.id === window.location.href.split('/').pop() ? "selected" : ""
        }>
          <Link onClick={closeMobileSidebar} to={`/convo/${convo.id}`}>
            {convo.name}
          </Link>
        </li>
      )}
    </ul>
    <CreateConversation />
  </aside>
}
