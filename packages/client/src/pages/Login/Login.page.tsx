import './login.page.scss';
import '../../styles/auth-pages.scss';
import { api } from '../../lib/API';

import React, { useRef, useState, FormEvent } from 'react';
import { Redirect } from 'react-router';


export const LoginPage = () => {

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>();
  const [loggedIn, setLoggedIn] = useState<boolean>();

  const login = async (e: FormEvent) => {
    e.preventDefault();

    setError(false);

    const data = await api.login(email.current?.value!, password.current?.value!);
    if (!data) setError(true);
    setLoggedIn(true);
    localStorage.setItem('token', data.token);
  };

  if (loggedIn) return <Redirect to="/" />;

  return <main className="login-page auth-page">
    <form onSubmit={login}>
      <h1>Login Page</h1>
      {error && <span className="error-message">Invalid login credentials</span>}
      <input ref={email} type="text" name="email" placeholder="Email" />
      <input ref={password} type="text" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </main>
};
