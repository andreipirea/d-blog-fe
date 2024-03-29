import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Meta from "../../../components/Meta";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { fetchPosts } from "../../../redux/actions/postsActions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { deletePost } from "../../../redux/actions/postsActions";
import postPageStyles from "../../../styles/PostPage.module.scss";
import Slider from "react-slick";
import ConfirmationDialog from "../../../components/ConfirmationDialog";


const Post = ({post}) => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.authReducer);
  const router = useRouter();
  const { id } = router.query;
  const [gallery, setGallery] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  // const posts = useSelector((state) => state.postsReducer);
  // const post = posts.filter((postId) => postId.id == id);
  console.log('post >>>>>>>>>>>>>>>>>>', post)

  useEffect(() => {
    // dispatch(fetchPosts());

    if (post[0] && post[0].imageGallery !== "") {
      setGallery(post[0].imageGallery.split(","));
    }
  }, []);

  const deleteHandler = async () => {
    
      await dispatch(deletePost(post[0].id));
      setOpenConfirmationDialog(false);
      router.push("/");
    
  };

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`${process.env.API_URL}/${gallery[i]}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    post[0] !== undefined && (
      <>
        <Meta description={post[0].content} />
        <div className={postPageStyles.post_page_container}>
          {userStatus.user && userStatus.user.userStatus === "admin" && (
            <div className={postPageStyles.admin_icons_container}>
              <Link
                href={`/[addEditPost]?postId=${post[0].id}`}
                as={`/editPost/?postId=${post[0].id}`}
              >
                <EditIcon
                  style={{
                    fontSize: 60,
                    color: "#009933",
                    cursor: "pointer",
                    margin: "10px 20px"
                  }}
                />
              </Link>
              <DeleteForeverIcon
                style={{
                  fontSize: 60,
                  color: "#ff0000",
                  cursor: "pointer",
                  margin: "10px 20px"
                }}
                onClick={() => setOpenConfirmationDialog(true)}
              />
            </div>
          )}
          <div className={postPageStyles.title_container}>
            {ReactHtmlParser(post[0].title)}
          </div>
          <div className={postPageStyles.post_page_inner_wrapper}>
            {post[0].imageUrl && (
              <img src={`${process.env.API_URL}/${post[0].imageUrl}`} />
            )}
            {post[0].link && (
              <div className={postPageStyles.video_container}>
                <iframe
                  className={postPageStyles.video}
                  width="100%"
                  height="auto"
                  src={post[0].link}
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {post[0].imageGallery !== "" && (
              <div className={postPageStyles.slider_container}>
                <Slider {...settings}>
                  {gallery.map((slide, index) => {
                    return (
                      <div
                        data-index={index}
                        key={index}
                        className={postPageStyles.slide_wrapper}
                      >
                        <img
                          className={postPageStyles.slide_image}
                          alt={`${process.env.API_URL}/${slide}`}
                          src={`${process.env.API_URL}/${slide}`}
                        />
                      </div>
                      // <div
                      //   data-index={index}
                      //   key={index}
                      //   className={postPageStyles.slide_wrapper}
                      // >
                      //   <img
                      //     className={postPageStyles.slide_image}
                      //     alt={`${process.env.API_URL}/${gallery[1]}`}
                      //     src={`${process.env.API_URL}/${gallery[1]}`}
                      //   />
                      // </div>
                    );
                  })}
                </Slider>
              </div>
            )}
            <div className={postPageStyles.content_container}>
              {ReactHtmlParser(post[0].content)}
            </div>
          </div>
        </div>
        <ConfirmationDialog 
          title={"Ești sigur că vrei să ștergi articolul?"}
          contentText={"Dacă ștergi articolul acesta nu va mai putea fi recuperat!"}
          noAnswer={() => setOpenConfirmationDialog(false)} 
          yesAnswer={deleteHandler} 
          open={openConfirmationDialog} 
        />
      </>
    )
  );
};

export default Post;


export async function getServerSideProps(context) {
  const {id} = context.query;
  const postsResponse = await fetch(`${process.env.API_URL}/getpost/${id}`);
  const post = await postsResponse.json(); 

  return { props: { post } };
}
