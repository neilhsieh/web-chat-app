import './home.page.scss';

import React, { useEffect, useState } from 'react';
import { ConversationList } from '../../Component/Sidebar/ConversationList';
import { getMe } from '../../config';
import { CurrentUser } from '../../containers/me.container';


export const HomePage = () => {

  // const [me, setMe] = useState<string>();
  const { me } = CurrentUser.useContainer();
  useEffect(() => {
    getMe();
  }, []);

  const getMe = async () => {
    // const me = await getMe();
  };

  return <div className="home-page">
    <ConversationList />
    <main className="welcome-screen">
      <span>Welcome {me?.firstName}, choose a conversation to start chatting.</span>
    </main>
  </div>
};
