import PostItem from './PostItem';
import postsListStyles from '../styles/PostsList.module.scss';

const PostsList = ({posts}) => {
  return (
    <div className={postsListStyles.grid}>
      {posts.map((post, idx) => (
        <PostItem post={post} key={idx} />
      ))}
    </div>
  )
};

export default PostsList;