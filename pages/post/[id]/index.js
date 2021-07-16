import {server} from '../../../config';
import Link from 'next/link';
// import {useRouter} from 'next/router';
import Meta from '../../../components/Meta';
import { useSelector, useDispatch } from "react-redux";

const Post = ({post}) => {
  // const router = useRouter();
  // const {id} = router.query;
  // const posts = useSelector(state => state.postsReducer)
  // const post = posts.filter(postId => postId == id)
  return (
    <>
      <Meta title={post.title} description={post.content} />
      <h1>{post.title}</h1>
      <p>{post.content}</p>      
      <br />
      <Link href="/">Go Back</Link>
    </>
  )
};


export const getStaticProps = async (context) => {
  const res = await fetch(`http://localhost:4000/getpost/${context.params.id}`);
  const post = await res.json();

  return {
    props: {
      post
    }
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:4000/getposts/`);
  const posts = await res.json();

  const ids = posts.map(post => post.id);
  const paths = ids.map(id => ({params:{id: id.toString()}}))

  return {
    paths,
    fallback: false
  }
};

// export const getStaticProps = async (context) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);
//   const article = await res.json();

//   return {
//     props: {
//       article
//     }
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const articles = await res.json();

//   const ids = articles.map(article => article.id);
//   const paths = ids.map(id => ({params:{id: id.toString()}}))

//   return {
//     paths,
//     fallback: false
//   }
// };

export default Post;