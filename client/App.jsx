import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import MainContainer from './containers/MainContainer';

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => setLogin(true));

  return (
    <div id="app">
      <Login />
      {/* <MainContainer /> */}
    </div>
  );
}

export default App;
