import React, { useState } from 'react';
import Link from 'next/link';
import { signUp } from '../utils/api';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const response = await signUp(username, password);
    // Handle signup response
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup}>
        <label>
          <input value={username} onChange={handleUsernameChange} type="text" placeholder="username"/>
        </label>
        <br/>
        <label>
          <input value={password} onChange={handlePasswordChange} type="password" placeholder="password"/>
        </label>
        <br/>
        <button type="submit">signup</button>
      </form>

      <Link href="/">
        Go to Home
      </Link>
    </div>
  );
};

export default Signup;