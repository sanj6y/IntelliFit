/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import logo from "../logo.png"

// eslint-disable-next-line import/no-unresolved
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, login } from '../firebase';
import '../Styles/SignIn.css';
function SignIn() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [currUser, loading, err] = useAuthState(auth);
  const nav = useNavigate();
  useEffect(() => {
    if (loading) {
      // future implementation of loading screen
      return;
    }
    if (currUser) nav('/dash');
  }, [currUser, loading]);

  return (
    <div className="holder">
      <div className="welcome-panel">
        <div className="welcome">
          <div className="title">
            <img src={logo} width={85} height={55}/>
          </div>
          <div className='title-holder-holder'>
            <h2>
              Sign in
            </h2>
            <hr/>
          </div>
          <input
            value={email}
            placeholder="E-mail"
            type="email"
            className="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
            type="password"
            className="password"
          />
          <button className="login" onClick={() => login(email, pass)}>
            Login
          </button>
          <div className='holder-link-holder'>
            <Link to="/register" className="sign-up-button">
                <span>Sign up</span>
              </Link>
            <Link to="/reset" className="forgot-password">
              <span>Forgot password?</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SignIn;
