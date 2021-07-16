import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./rootReducer"

const middleware = [thunk]

export const store = () => createStore(rootReducer, compose(applyMiddleware(...middleware)));

// export const wrapper = createWrapper(store);