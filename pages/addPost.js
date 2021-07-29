import Meta from "../components/Meta";
import addPostStyles from "../styles/AddPost.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import ArticleEditor from "../components/ArticleEditor";

import { convertFromRaw, convertToRaw } from "draft-js";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/router";

const addPost = () => {
  const router = useRouter();
  const [titleEditorState, setTitleEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [contentEditorState, setContentEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  let convertedTitle;
  let convertedContent;

  const onTitleEditorStateChange = (titleEditorState) => {
    setTitleEditorState(titleEditorState);
  };

  const onContentEditorStateChange = (contentEditorState) => {
    setContentEditorState(contentEditorState);
  };

  useEffect(() => {
    convertedTitle = draftToHtml(
      convertToRaw(titleEditorState.getCurrentContent())
    );
    convertedContent = draftToHtml(
      convertToRaw(contentEditorState.getCurrentContent())
    );
  }, [onTitleEditorStateChange, onContentEditorStateChange]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImage(reader.result)
      }
    };
    reader.readAsDataURL(e.target.files[0]);

  }

  const submitHandler = async () => {
    console.log("POST ADDED!");
    router.push('/');
    const formData = new FormData();
    formData.append("title", convertedTitle);
    formData.append("content", convertedContent);
    formData.append("link", link);
    formData.append("imageUrl", image);
    try {
      const response = await fetch(`${process.env.API_URL}/addpost`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
    }
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
              onChange={imageHandler}
            />
          </label>
          <img src={previewImage} alt="" id="preview-image" />
        </div>
        <a href="#" onClick={submitHandler}>
          Adauga postarea
        </a>
      </form>
    </div>
  );
};

export default addPost;
