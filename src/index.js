import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'

var $ = require('jquery');
var Popper = require('popper.js/dist/umd/popper.js');

window.jQuery = window.$ = $;
window.Popper = Popper;

require('bootstrap');

const { persistor, store } = configureStore()

const onBeforeLift = () => {
  // take some action before the gate lifts
}

ReactDOM.render((
  <Provider store={store}>
    <PersistGate 
      loading={<div>Loading...</div>}
      onBeforeLift={onBeforeLift}
      persistor={persistor}>
      <BrowserRouter>
	  <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
