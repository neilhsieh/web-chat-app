import './home.page.scss';

import React from 'react';
import { ConversationList } from '../../Component/Sidebar/ConversationList';


export const HomePage = () => {

  return <div className="home-page">
    <ConversationList />
    {/* <h1>Chat app</h1> */}
  </div>
};
