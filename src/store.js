import { applyMiddleware, createStore, combineReducers } from "redux"
import { persistStore, persistCombineReducers } from 'redux-persist'
import { SETTINGS } from './constants'
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import reducers from "./reducers"
import storage from 'redux-persist/es/storage' // localStorage
import thunk from "redux-thunk"
import { IntlReducer as Intl } from 'react-redux-multilingual'

// Configure Redux store

const config = {
  key: 'root',
  storage,
  debug: SETTINGS.DEBUG,
}
const allReducers = Object.assign({}, reducers, {Intl})

const reducer = persistCombineReducers(config, allReducers)
const middleware = applyMiddleware(promise(), thunk, logger)

function configureStore () {

  let store = createStore(reducer, middleware)
  let persistor = persistStore(store)

  return { persistor, store }
}

export default configureStore
