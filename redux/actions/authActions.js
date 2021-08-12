export const SIGNUN_SUCCESS = "SIGNIN_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";


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
  } catch (err) {
    console.error(err);
  }
};