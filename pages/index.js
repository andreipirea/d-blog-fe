import {server} from '../config';
import PostsList from "../components/PostsList";

export default function Home({ posts }) {
  return (
    <div>
      <PostsList posts={posts} />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    `${server}/api/posts`
  );
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};

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
