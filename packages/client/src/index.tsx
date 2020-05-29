import './styles/base.scss';
import './lib/API';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './Router/Router';
import { Conversations } from './containers/conversations.container';
import { Messages } from './containers/messages.container';

import './lib/sockets';
import { CurrentUser } from './containers/me.container';
import { MobileSidebar } from './containers/mobileSidebar.container';

(async () =>
  ReactDOM.render(
    <CurrentUser.Provider>
      <Conversations.Provider>
        <Messages.Provider>
          <MobileSidebar.Provider>
            <AppRouter />
          </MobileSidebar.Provider>
        </Messages.Provider>
      </Conversations.Provider>
    </CurrentUser.Provider>,
    document.getElementById('app')
  )
)();
