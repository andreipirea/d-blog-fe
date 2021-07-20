import Meta from "../components/Meta";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import ArticleEditor from "../components/ArticleEditor";

import { convertFromRaw, convertToRaw } from "draft-js";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useRouter } from 'next/router'

// const Editor = dynamic(
//   () => import('react-draft-wysiwyg').then(mod => mod.Editor),
//   { ssr: false }
// )

const addPost = () => {
  const router = useRouter();
  const [titleEditorState, setTitleEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [contentEditorState, setContentEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  let convertedTitle;
  let convertedContent;

  const onTitleEditorStateChange = (titleEditorState) => {
    setTitleEditorState(titleEditorState);
  };

  const onContentEditorStateChange = (contentEditorState) => {
    setContentEditorState(contentEditorState);
  };

  useEffect(() => {
    convertedTitle = draftToHtml(convertToRaw(titleEditorState.getCurrentContent()));
    convertedContent = draftToHtml(convertToRaw(contentEditorState.getCurrentContent()));
  }, [onTitleEditorStateChange, onContentEditorStateChange]);

  const submitHandler = async () => {
    console.log("POST ADDED!");
    router.push('/');
    try {
      const response = await fetch(`${process.env.API_URL}/addpost`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          title: convertedTitle,
          content: convertedContent,
          link: link,
          imageUrl: image
        })
      })

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
      <form id="post-form" method="POST">
        <div className="form-control">
          <label>
            Titlu
            <ArticleEditor
              editorState={titleEditorState}
              onEditorStateChange={onTitleEditorStateChange}
              
            />
            
          </label>
        </div>
        <div className="form-control">
          <label>
            Continut
            <ArticleEditor
              editorState={contentEditorState}
              onEditorStateChange={onContentEditorStateChange}
            />
          </label>
        </div>
        <div className="form-control">
          <label>
            Link you tube
            <input className="post-input" name="link" value={link} onChange={(e) => setLink(e.target.value)} />
          </label>
        </div>
        <div className="form-control">
          <label>
            Poster
            <input className="post-input" name="imageUrl" value={image} onChange={(e) => setImage(e.target.value)} />
          </label>
        </div>
        <a href="#" onClick={submitHandler}>
          Adauga postarea
        </a>
      </form>
    </div>
  );
};

export default addPost;
