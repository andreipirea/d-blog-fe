import {server} from '../config';
import PostsList from "../components/PostsList";

import { useEffect } from 'react';
import {fetchPosts} from '../redux/actions/postsActions';
import {getUser, logout} from '../redux/actions/authActions';
import { useSelector, useDispatch } from "react-redux";


export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    if (localStorage.getItem('token') !== null) {
      dispatch(getUser());
    }
  }, []);
  
  const posts = useSelector(state => state.postsReducer);

  return (!posts ? "loading..." : 
    <div>
      <PostsList posts={posts} />
    </div>
  
  );
}

// export const getStaticProps = async () => {
//   const res = await fetch(
//     "http://localhost:4000/getposts"
//   );
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// };

// export const getStaticProps = async () => {
//   const res = await fetch(
//     "https://jsonplaceholder.typicode.com/posts?_limit=6"
//   );
//   const articles = await res.json();

//   return {
//     props: {
//       articles,
//     },
//   };
// };
