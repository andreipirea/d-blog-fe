export const GET_SLIDES = "GET_SLIDES";
export const ADD_SLIDE = "ADD_SLIDE"
export const DELETE_SLIDE = "DELETE_SLIDE";
export const UPDATE_SLIDE = "UPDATE_SLIDE";


export const fetchSlides = () => async (dispatch) => {
    try {
      const response = await fetch(`${process.env.API_URL}/getslides`);
      const slides = await response.json();
      console.log(slides);
      dispatch({
        type: GET_SLIDES,
        payload: slides.reverse()
      });
    } catch (err) {
      console.log(err);
    }
  };

export const addSlide = (formValues) => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.API_URL}/addslide`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      body: formValues
    });
    const data = await response.json();
    dispatch({
      type: ADD_SLIDE,
      payload: data
    });
    
  } catch (err) {
    console.error(err);
  }
};

export const deleteSlide = (id) => async (dispatch) => {
  try {
    await fetch(
      `${process.env.API_URL}/deleteslide/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem('token')
        },
        body: null
      }
    );
    const response = await fetch(`${process.env.API_URL}/getslides`);
    const slides = await response.json();
    dispatch({
      type: DELETE_SLIDE,
      payload: slides.reverse()
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateSlide = (formValues, id) => async (dispatch) => {
  console.log("form values", formValues);
  try {
    const response = await fetch(`${process.env.API_URL}/updateslide/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      body: formValues
    })
    const data = await response.json();
    console.log("uptated data", data);
    dispatch({
      type: UPDATE_SLIDE,
      payload: data,
      id: id
    });
  } catch (err) {
    console.log(err);
  }
};
