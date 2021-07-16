import PostItem from './PostItem';
import postStyles from '../styles/Post.module.css';

const PostsList = ({posts}) => {
  return (
    <div className={postStyles.grid}>
      {posts.map((post, idx) => (
        <PostItem post={post} key={idx} />
      ))}
    </div>
  )
};

export default PostsList;