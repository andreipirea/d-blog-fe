export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOG_OUT = "LOG_OUT";
export const GET_USER = "GET_USER";


export const signup = (name, email, password) => async dispatch => {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/signup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });
    const data = await response.json();
    console.log("signup data", data);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: data
    });
  } catch (err) {
    console.error(err);
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    console.log("login data", data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => {
  return {
    type: LOG_OUT
  };
};

export const getUser = () => async (dispatch) => {

  try {
    const response = await fetch(`${process.env.API_URL}/auth/user`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    const user = await response.json();
    console.log("fetched user", user);
    dispatch({
      type: GET_USER,
      payload: user
    });
  } catch (err) {
    console.log(err);
  }
};