import { applyMiddleware, createStore } from "redux"
import { persistStore, persistCombineReducers } from 'redux-persist'
import { SETTINGS } from './constants'
import logger from "redux-logger"
import promise from "redux-promise-middleware"
import reducers from "./reducers"
import storage from 'redux-persist/es/storage' // localStorage
import thunk from "redux-thunk"

// Configure Redux store

const config = {
  key: 'root',
  storage,
  debug: SETTINGS.DEBUG,
}

const reducer = persistCombineReducers(config, reducers)
const middleware = applyMiddleware(promise(), thunk, logger)

function configureStore () {

  let store = createStore(reducer, middleware)
  let persistor = persistStore(store)

  return { persistor, store }
}

export default configureStore
