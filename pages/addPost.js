import Meta from "../components/Meta";
import addPostStyles from "../styles/AddPost.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useEffect } from "react";

import ArticleEditor from "../components/ArticleEditor";

import { convertToRaw } from "draft-js";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/router";
import { addPost, updatePost } from "../redux/actions/postsActions";
import { useSelector, useDispatch } from "react-redux";

const addPostPage = () => {
  const router = useRouter();
  const posts = useSelector((state) => state.postsReducer);
  const post = posts.filter((p) => p.id == router.query.postId);

  const contentDataStateTitle =
    post[0] &&
    ContentState.createFromBlockArray(convertFromHTML(post[0].title));
  const contentDataStateContent =
    post[0] &&
    ContentState.createFromBlockArray(convertFromHTML(post[0].content));
  const editorDataStateTitle =
    contentDataStateTitle &&
    EditorState.createWithContent(contentDataStateTitle);
  const editorDataStateContent =
    contentDataStateContent &&
    EditorState.createWithContent(contentDataStateContent);

  const [titleEditorState, setTitleEditorState] = useState(
    router.query.postId ? editorDataStateTitle : () => EditorState.createEmpty()
  );
  const [contentEditorState, setContentEditorState] = useState(
    router.query.postId
      ? editorDataStateContent
      : () => EditorState.createEmpty()
  );
  const [link, setLink] = useState(post[0] ? post[0].link : "");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();

  let convertedTitle;
  let convertedContent;

  // useEffect(() => {
  //   if (router.query.postId !== undefined) {
  //     console.log(post);
  //     console.log(router.query.postId);
  //     console.log(titleEditorState);
  //     console.log(contentEditorState);
  //     console.log(link);
  //     console.log(image);
  //   }
  // }, []);

  const onTitleEditorStateChange = (titleEditorState) => {
    setTitleEditorState(titleEditorState);
  };

  const onContentEditorStateChange = (contentEditorState) => {
    setContentEditorState(contentEditorState);
  };

  useEffect(() => {
    if (router.query.postId === undefined) {
      convertedTitle = draftToHtml(
        convertToRaw(titleEditorState.getCurrentContent())
      );
      convertedContent = draftToHtml(
        convertToRaw(contentEditorState.getCurrentContent())
      );
    }
  }, [onTitleEditorStateChange, onContentEditorStateChange]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = () => {
    console.log("POST ADDED!");
    const formData = new FormData();
    formData.append("title", convertedTitle);
    formData.append("content", convertedContent);
    formData.append("link", link);
    formData.append("imageUrl", image);

    if (!post[0]) {
      dispatch(addPost(formData));
    } else {
      dispatch(updatePost(formData, post[0].id));
    }
    router.push("/");
  };

  return (
    <div>
      <Meta title="Add Post" />
      <h1>Add Post</h1>
      <form id="post-form" method="POST" encType="multipart/form-data">
        <div className={addPostStyles.form_control}>
          <label>
            Titlu
            <ArticleEditor
              editorState={titleEditorState}
              onEditorStateChange={onTitleEditorStateChange}
            />
          </label>
        </div>
        <div className={addPostStyles.form_control}>
          <label>
            Continut
            <ArticleEditor
              editorState={contentEditorState}
              onEditorStateChange={onContentEditorStateChange}
            />
          </label>
        </div>
        <div className={addPostStyles.form_control}>
          <label>
            Link you tube
            <input
              className="post-input"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>
        </div>
        <div className={addPostStyles.form_control}>
          <label>
            Poster
            <input
              type="file"
              accept="image/*"
              className="post-input"
              name="imageUrl"
              title="alege o imagine"
              onChange={imageHandler}
            />
          </label>
          <img
            src={
              post[0]
                ? `${process.env.API_URL}/${post[0].imageUrl}`
                : previewImage
            }
            alt=""
            id="preview-image"
          />
          {post[0] && <p>{post[0].imageUrl.split("-")[1]}</p>}
        </div>
        <a href="#" onClick={submitHandler}>
          { post[0] ? 'Salveaza modificarile' : 'Adauga postarea'}
        </a>
      </form>
    </div>
  );
};

export default addPostPage;
