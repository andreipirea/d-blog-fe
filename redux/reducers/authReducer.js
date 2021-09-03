import { GET_USER, LOGIN_SUCCESS, LOG_OUT, SIGNUP_SUCCESS } from "../actions/authActions";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS: 
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user
      }
    case GET_USER:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: action.payload.message ? false : true,
        user: action.payload.user
      }
    case LOG_OUT: 
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}