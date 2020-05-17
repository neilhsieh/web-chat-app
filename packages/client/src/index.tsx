import './styles/base.scss';
import './lib/API';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './Router/Router';
import { useContainer } from 'unstated-next';
import { Conversations } from './containers/conversations.container';
import { Messages } from './containers/messages.container';

import './lib/sockets';

(async () =>
  ReactDOM.render(
    <Conversations.Provider>
      <Messages.Provider>
        <AppRouter />
      </Messages.Provider>,
    </Conversations.Provider>,
    document.getElementById('app')
  )
)();
