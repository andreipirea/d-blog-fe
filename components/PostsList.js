import PostItem from './PostItem';
import postStyles from '../styles/Post.module.css';

const PostsList = ({posts}) => {
  return (
    <div className={postStyles.grid}>
      {posts.map((post) => (
        <PostItem post={post} />
      ))}
    </div>
  )
};

export default PostsList;