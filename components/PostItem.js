import { useState } from "react";
import Link from "next/link";
import postStyles from "../styles/PostItem.module.scss";
import ReactHtmlParser from "react-html-parser";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../redux/actions/postsActions";
import { useRouter } from "next/router";
import ConfirmationDialog from "./ConfirmationDialog.js";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.authReducer);
  const router = useRouter();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  // const editHandler = () => {
  //   router.push("/addPost");
  // };

  const deleteHandler = () => {
      dispatch(deletePost(post.id));
      setOpenConfirmationDialog(false);
      router.push("/");
  };

  return (
    post.imageUrl !== undefined && (
      <div className={postStyles.card}>
        <Link href="/post/[id]" as={`/post/${post.id}`}>
          <div className={postStyles.linkContainer}>
            <div
              className={postStyles.category_label}
              style={
                post.category === "Activitati"
                  ? { backgroundColor: "#13aa52" }
                  : post.category === "Retete"
                    ? { backgroundColor: "#116149" }
                    : { backgroundColor: "#990000" }
              }
            >
              {post.category}
            </div>
            <div className={postStyles.playIcon}>
              {post.link && <PlayCircleOutlineIcon />}
            </div>
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
              onClick={() => setOpenConfirmationDialog(true)}
            />
          </div>
        )}
        <ConfirmationDialog 
          title={"Ești sigur că vrei să ștergi articolul?"}
          contentText={"Dacă ștergi articolul acesta nu va mai putea fi recuperat!"}
          noAnswer={() => setOpenConfirmationDialog(false)} 
          yesAnswer={deleteHandler} 
          open={openConfirmationDialog} 
          
        />
      </div>
    )
  );
};

export default PostItem;
