import { applyMiddleware, createStore } from "redux"
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage' // localStorage
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducers from "./reducers"

const config = {
  key: 'root',
  storage,
}

const reducer = persistCombineReducers(config, reducers)
const middleware = applyMiddleware(promise(), thunk, logger)

function configureStore () {

  let store = createStore(reducer, middleware)
  let persistor = persistStore(store)

  return { persistor, store }
}

export default configureStore
