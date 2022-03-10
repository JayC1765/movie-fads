import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchUserMovieList from './actions/actions';
import Login from './components/Login';
import MainContainer from './containers/MainContainer';

function App() {
  const [page, setPage] = useState('log in');

  const dispatch = useDispatch();

  // useEffect(() => setLogin(true));

  const handleSignup = (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const regex = /^[^<>'\"/;`%]*$ | /;
    if (username.match(regex)) {
      console.log(`Username may not include spaces or any of the following characters: ^[^<>'\\"/;\`%]*$`);
      return;
    }
    const password = document.querySelector('#password').value;

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
        return response.user;
      })
      .then((user) => dispatch(fetchUserMovieList(user)))
      .catch((err) => console.log(err));
  };

  const toggleForm = (event) => {
    if (page === 'sign up') setPage('log in');
    else setPage('sign up');
  };

  let content;
  if (page === 'sign up') {
    content = (
      <div>
        <Login
          buttonText="Sign Up"
          formMethod="post"
          formAction="user"
          handleSubmit={handleSignup}
          promptText="Already have an account? "
          linkText="Log in"
          toggleForm={toggleForm}
        />
      </div>
    );
  } else if (page === 'log in') {
    content = (
      <Login
        buttonText="Log In"
        formMethod="post"
        formAction="some-route"
        handleSubmit={handleLogin}
        promptText="Do you want to sign up? "
        linkText="Sign up"
        toggleForm={toggleForm}
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
