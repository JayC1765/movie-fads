import React from 'react';
import Login from './components/Login.jsx';
import MainContainer from './containers/MainContainer';

const App = () => {
  return(
   <div id = 'app'> 
    <Login />
    <MainContainer />
   </div>
  );
};

export default App;