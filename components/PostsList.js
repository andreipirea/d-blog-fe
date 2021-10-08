import { useState, useEffect } from "react";
import PostItem from "./PostItem";
import postsListStyles from "../styles/PostsList.module.scss";
// import Pagination from 'next-pagination'
import Pagination from "@mui/material/Pagination";

const PostsList = ({ posts }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const postsPerPage = 6;
  // const pagesVisited = pageNumber * postsPerPage;
  const indexOfLastPost = pageNumber * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const displayPosts = posts.slice(indexOfFirstPost, indexOfLastPost).map((post, idx) => <PostItem post={post} key={idx} />);
  // const pageCount = pageNumber => setCurrentPage(pageNumber);
  // const displayPosts = posts
  //   .slice(pagesVisited, pagesVisited + postsPerPage)
  //   .map((post, idx) => <PostItem post={post} key={idx} />);

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (event, number) => {
    setPageNumber(number);
    // window.scroll(0, 0);
  };

  return (
    <div className={postsListStyles.grid}>
      {
          displayPosts

        // displayPosts
        // displayPosts.map((post, idx) => (
        //   <PostItem post={post} key={idx} />
        // ))
      }
      <Pagination
        defaultPage={1}
        count={pageCount}
        onChange={handlePageChange}
        variant="outlined" 
        color="primary"
      />
    </div>
  );
};

export default PostsList;
