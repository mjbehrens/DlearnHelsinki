import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import translations from './translations/translations'
import { IntlProvider } from 'react-redux-multilingual'

// Required for bootstrap
var $ = require('jquery');
var Popper = require('popper.js/dist/umd/popper.js');

window.jQuery = window.$ = $;
window.Popper = Popper;

require('bootstrap');

// Get persistent Redux store
const { persistor, store } = configureStore()

const onBeforeLift = () => {
  // take some action before the gate lifts
}

// Renders the App in the 'root' div of the page
ReactDOM.render((
  <Provider store={store}>
    <IntlProvider translations={translations} locale='en'>

      <PersistGate
        loading={<div>Loading...</div>}
        onBeforeLift={onBeforeLift}
        persistor={persistor}>

        <BrowserRouter>
          <App />

        </BrowserRouter>

      </PersistGate>
    </IntlProvider>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
