import React, { useState, useEffect, useRef } from 'react';
import { Route, Router, Switch, useParams, Redirect } from 'react-router-dom';

import { HomePage } from '../pages/Home/Home.page';
import { history } from './history';
import { ConversationPage } from '../pages/Conversation/Conversation.page';
import { LoginPage } from '../pages/Login/Login.page';
import { SignUpPage } from '../pages/SignUp/SignUp.page';
import { api } from '../lib/API';
import { Params } from '../lib/types';
import { CurrentUser } from '../containers/me.container';

export const AppRouter = () => {

  const [loading, setLoading] = useState(true);
  const { settingMe } = CurrentUser.useContainer();

  const loadMe = async () => {
    await api.me();
    settingMe();
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) setLoading(false); // ie. in login & signup page
    else loadMe();
  }, []);

  if (loading) return <span>Loading...</span>;

  return <Router history={history}>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/convo/:conversationId" exact component={ConversationPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
    </Switch>
  </Router>
}