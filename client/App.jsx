import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import MainContainer from './containers/MainContainer';

function App() {
  const [page, setPage] = useState('sign up');

  // useEffect(() => setLogin(true));

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const regex = /^[^<>'\"/;`%]*$ | /;
    if (username.match(regex)) {
      console.log(`Username may not include spaces or any of the following characters: ^[^<>'\\"/;\`%]*$`);
      return;
    }
    const password = document.querySelector('#password').value;

    // let method;
    // if (page === 'sign up') method = 'POST';

    fetch('/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.result === 'success') {
          setPage('homepage');
        } else {
          setPage('log in');
        }
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    

    // let method;
    // if (page === 'sign up') method = 'POST';

    fetch(`/${username}/${password}`, {
      method: 'POST',
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.result === 'success') {
          setPage('homepage');
        } else {
          setPage('log in');
        }
      });
  };

  let content;
  if (page === 'sign up') {
    content = (
      <Login
        buttonText="Sign Up"
        formMethod="post"
        formAction="user"
        handleSubmit={handleSubmit}
      />
    );
  } else if (page === 'log in') {
    content = (
      <Login
        buttonText="Log In"
        formMethod="post"
        formAction="some-route"
        handleSubmit={handleLogin}
      />
    );
  } else if (page === 'homepage') {
    content = <MainContainer />;
  }

  return (
    <div id="app">
      {content}
    </div>
  );
}

export default App;
