export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST"
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";


export const fetchPosts = () => async (dispatch) => {
    try {
      const response = await fetch(`${process.env.API_URL}/getposts`);
      const posts = await response.json();
      console.log(posts);
      dispatch({
        type: GET_POSTS,
        payload: posts.reverse()
      });
    } catch (err) {
      console.log(err);
    }
  };

export const addPost = (formValues) => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.API_URL}/addpost`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      body: formValues
    });
    const data = await response.json();
    dispatch({
      type: ADD_POST,
      payload: data
    });
    
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await fetch(
      `${process.env.API_URL}/deletepost/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem('token')
        },
        body: null
      }
    );
    const response = await fetch(`${process.env.API_URL}/getposts`);
    const posts = await response.json();
    dispatch({
      type: DELETE_POST,
      payload: posts.reverse()
    });
  } catch (err) {
    console.error(err);
  }
};

export const updatePost = (formValues, id) => async (dispatch) => {
  console.log("form values", formValues);
  try {
    const response = await fetch(`${process.env.API_URL}/updatepost/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      body: formValues
    })
    const data = await response.json();
    console.log("uptated data", data);
    dispatch({
      type: UPDATE_POST,
      payload: data,
      id: id
    });
  } catch (err) {
    console.log(err);
  }
};
