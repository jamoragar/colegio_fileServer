import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from './firebase/firebase';

const root = document.getElementById('root');

export const renderApp = (isAuthenticated, user) => {
  ReactDOM.render(
    <React.StrictMode>
      <App isAuthenticated={isAuthenticated} user={user} />
    </React.StrictMode>,
    root
  );
}

firebase.auth().onAuthStateChanged(userAuth => {
  if (userAuth) {
      const user = userAuth;
      renderApp(true, user);
  }else {
      renderApp(false, null);
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
