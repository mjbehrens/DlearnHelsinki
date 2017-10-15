import { compose, applyMiddleware, createStore } from "redux"
import {persistStore, autoRehydrate} from 'redux-persist' 

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers"

const middleware = applyMiddleware(promise(), thunk, logger)
const store = createStore(reducer, compose(middleware, autoRehydrate()))

persistStore(store)

export default store
