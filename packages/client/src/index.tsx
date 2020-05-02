import './styles/base.scss';
import './lib/API';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './Router/Router';
import { useContainer } from 'unstated-next';
import { Conversations } from './containers/conversations.container';

import './lib/sockets';

(async () =>
  ReactDOM.render(
    <Conversations.Provider>
      <AppRouter />
    </Conversations.Provider>,
    document.getElementById('app')
  )
)();
