import './home.page.scss';

import React, { useEffect, useState } from 'react';
import { ConversationList } from '../../Component/Sidebar/ConversationList';
import { CurrentUser } from '../../containers/me.container';
import { Redirect } from 'react-router';
import { MobileSidebar } from '../../containers/mobileSidebar.container';


export const HomePage = () => {

  // const [me, setMe] = useState<string>();
  const { me } = CurrentUser.useContainer();
  const { toggleSidebar } = MobileSidebar.useContainer();
  const [meSet, updateMeSet] = useState<boolean>(false);

  useEffect(() => {
    checkUser();

  });

  const checkUser = () => {
    if (me) {
      updateMeSet(true);
    }
  };

  const loadingOrNot = () => {
    if (me === false) {
      return <Redirect to="/login" />;
    } else {
      return <div>Loading ...</div>
    }
  };

  return <>

    {meSet
      ? <div className="home-page">
        <ConversationList mToggle={{ mobileToggle: true, mobileToggleFunc: toggleSidebar }} />

        <main className="welcome-screen">
          <span>Welcome {me!.firstName}, choose a conversation to start chatting.</span>
        </main>
      </div>
      : loadingOrNot()
    }
  </>
};
