import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'

var $ = require('jquery');
var Popper = require('popper.js/dist/umd/popper.js');

window.jQuery = window.$ = $;
window.Popper = Popper;

require('bootstrap');

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
	  <App />
	</BrowserRouter>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
