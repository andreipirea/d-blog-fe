export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";

export const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    payload: posts
  }
};

export const fetchPosts = () => {
  return async dispatch => {
     const response = await fetch("http://localhost:4000/getposts");
      const posts = await response.json();
      console.log(posts);
      dispatch(getPosts(posts));
  }
};

export const getPost = (post) => {
  return {
    type: GET_POSTS,
    payload: post
  }
};

export const fetchPost = () => {
  return async dispatch => {
     const response = await fetch("http://localhost:4000/getpost");
      const posts = await response.json();
      console.log(posts);
      dispatch(getPosts(posts));
  }
};