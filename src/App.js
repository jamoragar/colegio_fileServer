import React from 'react';
import Routes from './components/Routes/Routes';
import Login from './components/Login/Login';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';


function App({isAuthenticated, user}) {
  return (
    <div className="App">
      {isAuthenticated ? (<Routes isAuthenticated={isAuthenticated} user={user} />) : (<Login />)}
    </div>
  );
}

export default App;
