import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import MainContainer from './containers/MainContainer';

function App() {
  const [page, setPage] = useState('sign up');

  // useEffect(() => setLogin(true));


  const handleSubmit = (event) => {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    event.preventDefault();
  
    let method;
    if (page === 'sign up') method = 'POST';

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
  }

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
        formMethod="get"
        formAction="some-route"
        handleSubmit={handleSubmit}
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
