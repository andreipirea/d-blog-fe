import Link from "next/link";
import postStyles from "../styles/PostItem.module.scss";
import ReactHtmlParser from "react-html-parser";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
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
        <div className={postStyles.playIcon}>
          {post.link && (
            <PlayCircleOutlineIcon />
          )}
        </div>
        <Link href="/post/[id]" as={`/post/${post.id}`}>
          <div className={postStyles.linkContainer}>
            <div className={postStyles.cardOverlay}></div>

            {post.imageUrl && (
              <img
                src={`${process.env.API_URL}/${post.imageUrl}`}
                className={"card-img"}
              />
            )}
            <div className={postStyles.title}>
              {ReactHtmlParser(post.title)}
            </div>
          </div>
        </Link>
        {userStatus.user && userStatus.user.userStatus === "admin" && (
          <div className={postStyles.iconsContainer}>
            <Link
              href={`/[addEditPost]?postId=${post.id}`}
              as={`/editPost/?postId=${post.id}`}
            >
              <EditIcon
                style={{
                  color: "#009933",
                  cursor: "pointer"
                }}
              />
            </Link>
            <DeleteForeverIcon
              style={{
                color: "#ff0000",
                cursor: "pointer"
              }}
              onClick={deleteHandler}
            />
          </div>
        )}
      </div>
    )
  );
};

export default PostItem;
