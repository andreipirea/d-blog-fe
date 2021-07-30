export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST"
export const DELETE_POST = "DELETE_POST";

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
          "Content-type": "application/json"
        },
        body: null
      }
    );
    
    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch (err) {
    console.error(err);
  }
};
