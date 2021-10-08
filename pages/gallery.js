import { useEffect } from "react";
import { useState } from "react";
import Meta from "../components/Meta";
import styles from "../styles/Gallery.module.scss";
import { useSelector } from "react-redux";
import Popup from "../components/Popup";
import { useDispatch } from "react-redux";
import {fetchPosts} from '../redux/actions/postsActions';
import {getUser} from '../redux/actions/authActions';



const gallery = () => {
  const posts = useSelector((state) => state.postsReducer);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    if (localStorage.getItem('token') !== null) {
      dispatch(getUser());
    }
  }, []);

  const handleShowPopup = (id) => {
    const imgUrl = posts.find((p) => p.id === id);
    setPopupImage(imgUrl.imageUrl);
    setShowPopup(true);
  };

  return (
    <>
      <div className={styles.gallery_container}>
        <Meta title="Fototeca" />
        <div className={styles.gallery_title}>Fototeca</div>
        <div className={styles.gallery_inner_container}>
          {posts.map((post, idx) => {
            return (
              <div
                className={styles.image_container}
                key={idx}
                onClick={() => handleShowPopup(post.id)}
              >
                <img src={`${process.env.API_URL}/${post.imageUrl}`} />
              </div>
            );
          })}
        </div>
      </div>
      <Popup
        imgSrc={`${process.env.API_URL}/${popupImage}`}
        showPopup={showPopup}
        // popupStyles={showPopup ? { display: "flex" } : { display: "none" }}
        onClickClose={() => setShowPopup(false)}
      />
    </>
  );
};

export default gallery;
