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

export default function Home() {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchSlides());
    dispatch(getAboutPage());

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

  const posts = useSelector((state) => state.postsReducer);

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

// export const getStaticProps = async () => {
//   const res = await fetch(
//     "http://localhost:4000/getposts"
//   );
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// };

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
