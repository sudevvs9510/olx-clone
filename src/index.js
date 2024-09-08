import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseProvider } from './firebase/firebaseContext';


const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <FirebaseProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseProvider>
);