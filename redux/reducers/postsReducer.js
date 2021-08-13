import { ADD_POST, DELETE_POST, GET_POSTS, UPDATE_POST } from "../actions/postsActions";

const initialState = [];

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return [...action.payload];

    case ADD_POST:
      return [...state, action.payload];

    case DELETE_POST:
      // const deletedPostIndex = state.findIndex(post => post.id === action.payload);
      // state.splice(deletedPostIndex, 1);
      return [...action.payload];

    case UPDATE_POST:
      const postToBeReplaced = state.findIndex(post => post.id === action.id);
      state.splice(postToBeReplaced, 1, action.payload);
      return [...state];

    default:
      return [...state];
  }
};
