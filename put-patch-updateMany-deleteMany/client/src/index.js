import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let initialStore = {
  loginDetails: {}, // Initialize as an object
}

let reducer = (latestStore = initialStore, dispatchedObj) => {
  if (dispatchedObj.type === "login") {
    return { ...latestStore, loginDetails: dispatchedObj.data };
  }
  return latestStore;
}

let store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
