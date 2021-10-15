import { getNativeSelectUtilityClasses } from "@mui/material";
import { CLEAR_ERROR_MESSAGE, GET_USER, LOGIN_SUCCESS, LOGIN_ERROR, LOG_OUT, SIGNUP_ERROR, SIGNUP_SUCCESS } from "../actions/authActions";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  message: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        message: null
      }
    case SIGNUP_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        message: null
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        message: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload.user,
        message: null
      }
    case LOGIN_ERROR:
      return {
        ...state,
        message: action.payload
      };
    case GET_USER:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: action.payload.message ? false : true,
        user: action.payload.user,
        message: null
      }
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        message: null
      };
    default:
      return state;
  }
}