import './styles/base.scss';
import './lib/API';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './Router/Router';
import { useContainer } from 'unstated-next';
import { Conversations } from './containers/conversations.container';
import { Messages } from './containers/messages.container';

import './lib/sockets';
import { CurrentUser } from './containers/me.container';

(async () =>
  ReactDOM.render(
    <Conversations.Provider>
      <Messages.Provider>
        <CurrentUser.Provider>
          <AppRouter />
        </CurrentUser.Provider>
      </Messages.Provider>
    </Conversations.Provider>,
    document.getElementById('app')
  )
)();
