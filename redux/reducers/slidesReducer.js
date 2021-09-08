import { ADD_SLIDE, DELETE_SLIDE, GET_SLIDES, UPDATE_SLIDE } from "../actions/slidesActions";

const initialState = [];

export const slidesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SLIDES:
      return [...action.payload];

    case ADD_SLIDE:
      return [...state, action.payload];

    case DELETE_SLIDE:
      // const deletedPostIndex = state.findIndex(post => post.id === action.payload);
      // state.splice(deletedPostIndex, 1);
      return [...action.payload];

    case UPDATE_SLIDE:
      const slideToBeReplaced = state.findIndex(post => post.id === action.id);
      state.splice(slideToBeReplaced, 1, action.payload);
      return [...state];

    default:
      return [...state];
  }
};
