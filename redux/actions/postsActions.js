export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";

export const fetchPosts = () => {
  return async dispatch => {
     const response = await fetch(`${process.env.API_URL}/getposts`);
      const posts = await response.json();
      console.log(posts);
      dispatch({
        type: GET_POSTS,
        payload: posts.reverse()
      });
  }
};

// export const getPost = (postId) => {
//     return {
//       type: GET_POST,
//       payload: postId
//     }
//   };

// export const getPost = (post) => {
//   return {
//     type: GET_POSTS,
//     payload: post
//   }
// };

// export const fetchPost = (postId) => {
//   return async dispatch => {
//      const response = await fetch(`http://localhost:4000/getpost/${postId}`);
//       const post = await response.json();
//       console.log(posts);
//       dispatch({
//         type: GET_POSTS,
//         payload: post
//       });
//   }
// };