import { ADD_POST, DELETE_POST, GET_POSTS } from "../actions/postsActions";

const initialState = [];

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return [...action.payload];

    case ADD_POST:
      return [...state, action.payload];

    case DELETE_POST:
      const deletedPostIndex = state.findIndex(post => post.id === action.payload);
      state.splice(deletedPostIndex, 1);
      return [...state];

    default:
      return [...state];
  }
};
