import Layout from "../components/Layout";
import "../styles/globals.css";
// import { wrapper } from "../redux/store"
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk"
// import withRedux, { createWrapper } from "next-redux-wrapper"
import {postsReducer} from '../redux/reducers/postsReducer';
import { Provider } from "react-redux";
// import {store} from "../redux/store";

const middleware = [thunk]
const rootReducer = combineReducers({
  postsReducer: postsReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, compose(applyMiddleware(...middleware), composeEnhancers()));

// const wrapper = createWrapper(store);
// const makeStore =  () => store;

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
