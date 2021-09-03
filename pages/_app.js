import Layout from "../components/Layout";
import "../styles/globals.css";
// import { wrapper } from "../redux/store"
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk"
// import withRedux, { createWrapper } from "next-redux-wrapper"
import {postsReducer} from '../redux/reducers/postsReducer';
import {authReducer} from '../redux/reducers/authReducer';
import { Provider } from "react-redux";
// import {store} from "../redux/store";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const middleware = [thunk]
const rootReducer = combineReducers({
  postsReducer: postsReducer,
  authReducer: authReducer
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
