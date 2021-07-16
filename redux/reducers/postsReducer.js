import {GET_POSTS} from '../actions/postsActions';

const initialState = [];

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return [...state, ...action.payload];

    default:
      return [...state];
  }
};