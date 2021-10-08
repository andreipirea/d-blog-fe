export const GET_ABOUT_PAGE = "GET_ABOUT_PAGE";
export const ADD_ABOUT_PAGE = "ADD_ABOUT_PAGE"
export const UPDATE_ABOUT_PAGE = "UPDATE_ABOUT_PAGE";


export const getAboutPage = () => async (dispatch) => {
    try {
      const response = await fetch(`${process.env.API_URL}/getaboutpage`);
      const page = await response.json();
      console.log("about page", page);
      dispatch({
        type: GET_ABOUT_PAGE,
        payload: page
      });
    } catch (err) {
      console.log(err);
    }
  };

export const addAboutPage = (formValues) => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.API_URL}/addaboutpage`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      body: formValues
    });
    const data = await response.json();
    dispatch({
      type: ADD_ABOUT_PAGE,
      payload: data
    });
    
  } catch (err) {
    console.error(err);
  }
};


export const updateAboutPage = (formValues, id) => async (dispatch) => {
  console.log("form values", formValues);
  try {
    const response = await fetch(`${process.env.API_URL}/updateaboutpage/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      body: formValues
    })
    const data = await response.json();
    console.log("uptated data", data);
    dispatch({
      type: UPDATE_ABOUT_PAGE,
      payload: data,
      id: id
    });
  } catch (err) {
    console.log(err);
  }
};
