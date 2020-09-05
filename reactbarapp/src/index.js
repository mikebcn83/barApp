import React from 'react';
import ReactDOM from 'react-dom';

import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth'
import firebaseConfig from './barapp-connection.json';

import App from './App';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
