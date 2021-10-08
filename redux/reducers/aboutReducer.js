import { ADD_ABOUT_PAGE, GET_ABOUT_PAGE, UPDATE_ABOUT_PAGE } from "../actions/aboutActions";

const initialState = [];

export const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ABOUT_PAGE:
      return [...action.payload];

    case ADD_ABOUT_PAGE:
      return [...state, action.payload];

    case UPDATE_ABOUT_PAGE:
      const slideToBeReplaced = state.findIndex(post => post.id === action.id);
      state.splice(slideToBeReplaced, 1, action.payload);
      return [...state];

    default:
      return [...state];
  }
};