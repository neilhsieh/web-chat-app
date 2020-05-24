import './home.page.scss';

import React, { useEffect, useState } from 'react';
import { ConversationList } from '../../Component/Sidebar/ConversationList';
import { CurrentUser } from '../../containers/me.container';
import { Redirect } from 'react-router';


export const HomePage = () => {

  // const [me, setMe] = useState<string>();
  const { me } = CurrentUser.useContainer();

  const checkUser = () => {
    if (!me) {
      return <Redirect to="/login" />;
    };
    return;
  };

  return <>
    {!me ? checkUser() :
      <div className="home-page">
        <ConversationList />
        <main className="welcome-screen">
          <span>Welcome {me?.firstName}, choose a conversation to start chatting.</span>
        </main>
      </div>
    }
  </>
};
