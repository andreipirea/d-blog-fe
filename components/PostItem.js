import Link from "next/link";
import postStyles from "../styles/Post.module.css";
import ReactHtmlParser from "react-html-parser";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/actions/postsActions";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // const editHandler = () => {
  //   router.push("/addPost");
  // };

  const deleteHandler = async (postId) => {
    dispatch(deletePost(postId));
    router.push("/");
  };

  return (
    post.imageUrl !== undefined && (
      <div className={postStyles.card}>
        <Link href="/post/[id]" as={`/post/${post.id}`}>
          <div style={{ cursor: "pointer" }}>
            <img
              src={`${process.env.API_URL}/${post.imageUrl}`}
              className={"card-img"}
            />
            <div>{ReactHtmlParser(post.title)}</div>
            <div>{ReactHtmlParser(post.content)}</div>
            <p>{post.link}</p>
          </div>
        </Link>
        <Link href={`/addPost?postId=${post.id}`}>
          <EditIcon style={({ fontSize: 30, color: "#009933", cursor: "pointer" })} />
        </Link>
        <DeleteForeverIcon
          style={({ fontSize: 30,  color: "#ff0000", cursor: "pointer" })}
          onClick={() => deleteHandler(post.id)}
        />
      </div>
    )
  );
};

export default PostItem;
