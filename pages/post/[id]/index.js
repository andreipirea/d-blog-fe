import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Meta from "../../../components/Meta";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { fetchPosts } from "../../../redux/actions/postsActions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { deletePost } from "../../../redux/actions/postsActions";

const Post = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const posts = useSelector((state) => state.postsReducer);
  const post = posts.filter((postId) => postId.id == id);

  const deleteHandler = async () => {
    let answer = confirm("Sigur vrei sa stergi postarea?");
    if (answer) {
      await dispatch(deletePost(post[0].id));
      router.push("/");
    } else {
      return;
    }
  };

  return (
    post[0] !== undefined && (
      <>
        <Meta title={"Titlu"} description={post[0].content} />
        <Link
          href={`/[addEditPost]?postId=${post[0].id}`}
          as={`/editPost/?postId=${post[0].id}`}
        >
          <EditIcon
            style={{ fontSize: 30, color: "#009933", cursor: "pointer" }}
          />
        </Link>
        <DeleteForeverIcon
          style={{ fontSize: 30, color: "#ff0000", cursor: "pointer" }}
          onClick={deleteHandler}
        />
        <div>{ReactHtmlParser(post[0].title)}</div>
        {post[0].imageUrl && (
          <img
            src={`${process.env.API_URL}/${post[0].imageUrl}`}
            style={{ width: "80%", height: "auto" }}
          />
        )}
        {post[0].link && (
          <iframe width="100%" height="auto" src={post[0].link} allowFullScreen></iframe>
        )}
        <p>{post[0].id}</p>
        <div>{ReactHtmlParser(post[0].content)}</div>
        <p>{post[0].link}</p>
        <br />
        <Link href="/">Go Back</Link>
      </>
    )
  );
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
