import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import MainContainer from './containers/MainContainer';

function App() {
  const [page, setPage] = useState('sign up');

  console.log('login', page);

  // useEffect(() => setLogin(true));

  let content;

  if (page === 'sign up') {
    content = (
      <Login
        buttonText="Sign Up"
        formMethod="post"
        formAction="user"
      />
    );
  } else if (page === 'log in') {
    content = (
      <Login
        buttonText="Log In"
        formMethod="get"
        formAction="some-route"
      />
    );
  } else if (page === 'homepage') {
    content = <MainContainer />;
  }

  console.log('content', content);

  return (
    <div id="app">
      {content}
    </div>
  );
}

export default App;
