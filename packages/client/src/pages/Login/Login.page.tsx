import './login.page.scss';
import '../../styles/auth-pages.scss';
import { api } from '../../lib/API';

import React, { useRef, useState, FormEvent, useEffect } from 'react';
import { Redirect } from 'react-router';
import { CurrentUser } from '../../containers/me.container';


export const LoginPage = () => {

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>();
  const [loggedIn, setLoggedIn] = useState<boolean>();
  const { me, settingMe } = CurrentUser.useContainer();

  useEffect(() => {
    if (loggedIn) {
      setMe();
    }
  }, [loggedIn]);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    const data = await api.login(email.current?.value!, password.current?.value!);
    if (!data) setError(true);
    localStorage.setItem('token', data.token);

    setLoggedIn(true);

  };

  const setMe = async () => {
    await settingMe();
  };

  return <>
    {loggedIn && me ? <Redirect to="/" />
      :
      <main className="login-page auth-page">
        <form onSubmit={login}>
          <h1>Login Page</h1>
          {error && <span className="error-message">Invalid login credentials</span>}
          <input ref={email} type="text" name="email" placeholder="Email" />
          <input ref={password} type="password" name="password" placeholder="Password" />
          <div className="button-group">
            <button type="submit">Login</button>
          </div>
          <div className="redirect-signup">
            <span><a href="/signup">Or cick me to sign up!</a></span>
          </div>
        </form>
      </main>
    }

  </>
};
