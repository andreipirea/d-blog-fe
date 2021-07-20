import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./rootReducer"

const middleware = [thunk]

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const store = createStore(rootReducer, compose(applyMiddleware(...middleware), composeEnhancers()));


// export const wrapper = createWrapper(store);

export default store;