import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styles from "../styles/CategoryPage.module.scss";

import PostsList from "../components/PostsList";
import {fetchPosts} from '../redux/actions/postsActions';
import {getUser} from '../redux/actions/authActions';


const categoryPage = () => {
  const router = useRouter();
  const {category} = router.query;
  const posts = useSelector(state => state.postsReducer);
  const categoryPosts = posts.filter(p => p.category === category);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchPosts());
    if (localStorage.getItem('token') !== null) {
      dispatch(getUser());
    }
  }, []);

  return (
    <div className={styles.category_page_container}>
      {categoryPosts && <div className={styles.category_title}>{category}</div>}
      <PostsList posts={categoryPosts} />
    </div>
  );
};

export default categoryPage;