import '../../styles/auth-pages.scss';
import './signup.page.scss';

import React, { useRef, useState, FormEvent } from 'react';
import { api } from '../../lib/API';
import { Redirect } from 'react-router-dom';

export const SignUpPage = () => {

  const defaultMissingInputs: string[] = ['First Name', 'Last Name', 'Email', 'Password'];


  const [error, setError] = useState<boolean>();
  const [loggedIn, setLoggedIn] = useState<boolean>();
  const [missingFields, setMissingFields] = useState<String[]>();
  const [emailError, setEmailError] = useState<string>('');
  const fName = useRef<HTMLInputElement>(null);
  const lName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const createNewUser = async (e: FormEvent) => {
    e.preventDefault();
    const newUser = await api.createUser(
      fName.current!.value, lName.current!.value, email.current!.value, password.current!.value);
    // Check if missing any fields
    if (!(!!fName.current!.value && !!lName.current!.value && !!email.current!.value && !!password.current!.value)) {

      const inputObj = {
        'First Name': fName.current!.value,
        'Last Name': lName.current!.value,
        // tslint:disable-next-line: object-literal-key-quotes
        'Email': email.current!.value,
        // tslint:disable-next-line: object-literal-key-quotes
        'Password': password.current!.value
      };
      let missingInputs: string[] = [];
      missingInputs = defaultMissingInputs.filter(input => {
        // @ts-ignore
        return inputObj[input] === '';
      });
      setMissingFields(missingInputs);
    } else if (newUser!.error) {
      setEmailError(newUser.error);
    } else {
      const data = await api.login(email.current!.value!, password.current!.value!);

      // LOG IN COPIED
      // If no token, set error to true
      if (!data) setError(true);
      setLoggedIn(true);
      localStorage.setItem('token', data.token);
    }


  };

  if (loggedIn) return <Redirect to="/" />;

  return <main className="sign-up-page auth-page">
    <form>
      <h1>Create a new account:</h1>
      {emailError ? <div className="error-message email-error">{emailError}</div> : <div></div>}
      {missingFields ? <div className="error-message missing-fields">{
        missingFields.map((field, key) =>
          <span key={key}>{field}</span>
        )} field(s) is missing.</div> : <div></div>}
      {error && <span className="error-message">Invalid login credentials</span>}
      <div className="input-fields">
        <input type="text" name="First Name" placeholder="First Name" ref={fName} required />
        <input type="text" name="Last Name" placeholder="Last Name" ref={lName} required />
        <input type="text" name="Email" placeholder="Email" ref={email} required />
        <input type="text" name="Password" placeholder="Password" ref={password} required />
      </div>
      <div className="button-group">
        <button className="submit" type="submit" onClick={createNewUser}>Create!</button>
      </div>
    </form>
  </main>
};
