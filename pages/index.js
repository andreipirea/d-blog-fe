import { server } from "../config";
import PostsList from "../components/PostsList";

import { useState, useEffect } from "react";
import { fetchPosts } from "../redux/actions/postsActions";
import { fetchSlides } from "../redux/actions/slidesActions";
import { getAboutPage } from "../redux/actions/aboutActions";
import { getUser, logout } from "../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import HomeCarousel from "../components/HomeCarousel";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useRouter } from "next/router";

export default function Home({posts}) {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchPosts());
    dispatch(fetchSlides());
    // dispatch(getAboutPage());

    if (localStorage.getItem("token") !== null) {
      dispatch(getUser());
    } else {
      if (sessionStorage.getItem("newsletter") == null) {
        setTimeout(() => {
          setOpenConfirmationDialog(true);
        }, 3000);
      }
    }
  }, []);

  // const posts = useSelector((state) => state.postsReducer);

  return !posts ? (
    "loading..."
  ) : (
    <div>
      <HomeCarousel />
      <PostsList posts={posts} />
      <ConfirmationDialog
        title={"Newsletter?"}
        contentText={"Vrei sa primesti de veste cand apare un articol nou?"}
        noAnswer={() => {
          setOpenConfirmationDialog(false);
          sessionStorage.setItem("newsletter", "no");
        }}
        yesAnswer={() => {
          setOpenConfirmationDialog(false);
          sessionStorage.setItem("newsletter", "no");
          router.push("/signup");
        }}
        open={openConfirmationDialog}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const postsResponse = await fetch(`${process.env.API_URL}/getposts`);
  const posts = await postsResponse.json(); 

  // const slidesResponse = await fetch(`${process.env.API_URL}/getslides`);
  // const slides = await slidesResponse.json();

  return { props: { posts } };
}
