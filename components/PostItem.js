import Link from 'next/link';
import postStyles from '../styles/Post.module.css';
import ReactHtmlParser from 'react-html-parser';

const PostItem = ({post}) => {
  return (
    <Link href="/post/[id]" as={`/post/${post.id}`}>
      <a className={postStyles.card}>
        <div>{ReactHtmlParser(post.title)}</div>
        <div>{ReactHtmlParser(post.content)}</div>
        <p>{post.link}</p>
      </a>
    </Link>
  )
};

export default PostItem;