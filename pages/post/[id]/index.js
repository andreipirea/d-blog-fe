import Link from 'next/link';
import {useRouter} from 'next/router';
import Meta from '../../../components/Meta';
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from 'react-html-parser';


const Post = () => {
  const router = useRouter();
  const {id} = router.query;
  const posts = useSelector(state => state.postsReducer);
  const post = posts.filter(postId => postId.id == id);

  return (
    <>
      <Meta title={post[0].title} description={post[0].content} />
      <div>{ReactHtmlParser(post[0].title)}</div>
      <p>{post[0].id}</p>     
      <div>{ReactHtmlParser(post[0].content)}</div>     
      <p>{post[0].link}</p>     
      <br />
      <Link href="/">Go Back</Link>
    </>
  )
};


// export const getStaticProps = async (context) => {
//   const res = await fetch(`http://localhost:4000/getpost/${context.params.id}`);
//   const post = await res.json();

//   return {
//     props: {
//       post
//     }
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch(`http://localhost:4000/getposts/`);
//   const posts = await res.json();

//   const ids = posts.map(post => post.id);
//   const paths = ids.map(id => ({params:{id: id.toString()}}))

//   return {
//     paths,
//     fallback: false
//   }
// };

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