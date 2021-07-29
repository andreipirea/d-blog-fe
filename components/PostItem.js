import Link from 'next/link';
import postStyles from '../styles/Post.module.css';
import ReactHtmlParser from 'react-html-parser';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const PostItem = ({post}) => {
  return (
    <Link href="/post/[id]" as={`/post/${post.id}`}>
      <div className={postStyles.card}>
        <img src={`${process.env.API_URL}/${post.imageUrl}`} className={"card-img"} />
        <div>{ReactHtmlParser(post.title)}</div>
        <div>{ReactHtmlParser(post.content)}</div>
        <p>{post.link}</p>
        <EditIcon style={{ fontSize: 30 }, { color: "#009933" }} />
        <DeleteForeverIcon style={{ fontSize: 30 }, { color: "#ff0000" }} />
      </div>
    </Link>
  )
};

export default PostItem;