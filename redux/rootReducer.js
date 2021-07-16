import {postsReducer} from './reducers/postsReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  postsReducer: postsReducer
});

export default rootReducer;