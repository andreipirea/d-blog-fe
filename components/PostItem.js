import Link from "next/link";
import postStyles from "../styles/Post.module.css";
import ReactHtmlParser from "react-html-parser";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../redux/actions/postsActions";
import { useRouter } from "next/router";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.authReducer);
  const router = useRouter();

  // const editHandler = () => {
  //   router.push("/addPost");
  // };

  const deleteHandler = () => {
    let answer = confirm("Sigur vrei sa stergi postarea?");
    if (answer) {
      dispatch(deletePost(post.id));
      router.push("/");
    } else {
      return;
    }
  };

  return (
    post.imageUrl !== undefined && (
      <div className={postStyles.card}>
        <Link href="/post/[id]" as={`/post/${post.id}`}>
          <div style={{ cursor: "pointer" }}>
            {post.imageUrl && (
              <img
                src={`${process.env.API_URL}/${post.imageUrl}`}
                className={"card-img"}
              />
            )}
            <div>{ReactHtmlParser(post.title)}</div>
            <div>{ReactHtmlParser(post.content)}</div>
          </div>
        </Link>
        {userStatus.user && userStatus.user.userStatus === "admin" && (
          <>
            <Link
              href={`/[addEditPost]?postId=${post.id}`}
              as={`/editPost/?postId=${post.id}`}
            >
              <EditIcon
                style={{ fontSize: 30, color: "#009933", cursor: "pointer" }}
              />
            </Link>
            <DeleteForeverIcon
              style={{ fontSize: 30, color: "#ff0000", cursor: "pointer" }}
              onClick={deleteHandler}
            />
          </>
        )}
      </div>
    )
  );
};

export default PostItem;
