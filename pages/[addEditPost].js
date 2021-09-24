import React, { Component } from "react";
import Meta from "../components/Meta";
import addPostStyles from "../styles/AddPost.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useEffect } from "react";

import ArticleEditor from "../components/ArticleEditor";
import DropzoneUploader from "../components/DropzoneUploader";

import { convertToRaw } from "draft-js";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/router";
import { addPost, updatePost } from "../redux/actions/postsActions";
import { useSelector, useDispatch } from "react-redux";

const addPostPage = () => {
  const router = useRouter();
  const posts = useSelector((state) => state.postsReducer);
  const userStatus = useSelector((state) => state.authReducer);
  const post = posts.filter((p) => p.id == router.query.postId);
  const dispatch = useDispatch();

  const contentDataStateTitle =
    post[0] &&
    ContentState.createFromBlockArray(
      convertFromHTML(post[0].title !== undefined ? post[0].title : "")
    );
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
  const [image, setImage] = useState([]);
  const [postCarousel, setPostCarousel] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [removeImage, setRemoveImage] = useState(false);

  let convertedTitle;
  let convertedContent;

  const getPosterImage = async (imgFile) => {
    const resImg = await fetch(`${process.env.API_URL}/${imgFile}`);
    const bufImg = await resImg.arrayBuffer();
    const fileImg = new File([bufImg], imgFile.split("\\")[1], { type: "image/png" });
    setImage([fileImg]);
  };  

  const getCarouselImages = async (img) => {
    const fileArr = [];
    const res = await fetch(`${process.env.API_URL}/${img}`);
    const buf = await res.arrayBuffer();
    const file = new File([buf], img.split("\\")[1], { type: "image/png" });
    fileArr.push(file);
    setPostCarousel(fileArr);
    console.log("file array -> ", fileArr);
  };

  useEffect(() => {
    if (post[0] && post[0].imageUrl != "") {
      getPosterImage(post[0].imageUrl);
    }

    if (post[0] && post[0].imageGallery != "") {
      const carouselArray = post[0].imageGallery.split(",");
      carouselArray.forEach((imgName) => {
        getCarouselImages(imgName);
      });
    }
    console.log("user status", userStatus);
  }, []);

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

  // const imageHandler = (e) => {
  //   setImage(e.target.files[0] ? e.target.files[0] : "");
  //   if (e.target.files) {
  //     console.log("multiple upload", e.target.files[0]);
  //     setRemoveImage(false);
  //   }

  //   if (e.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setPreviewImage(reader.result);
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  // const carouselImageHandler = (e) => {
  //   setPostCarousel(e.target.files ? e.target.files : "");
  //   if (e.target.files) {
  //     console.log("multiple upload", e.target.files);
  //     setRemoveImage(false);
  //   }

  //   // if (e.target.files) {
  //   //   const reader = new FileReader();
  //   //   reader.onload = () => {
  //   //     if (reader.readyState === 2) {
  //   //       setPreviewImage(reader.result);
  //   //     }
  //   //   };
  //   //   reader.readAsDataURL(e.target.files);
  //   // }
  // };

  const handleRemoveImage = () => {
    setImage("");
    setRemoveImage(true);
  };

  const handleDropzonePosterOnChangeStatus = (fileWithMeta, status) => {
    if (status === "done" || status === "removed") {
      if (status === 'done') {
        image.push(fileWithMeta.file);
      } else {
        setImage([]);
      }
    }
    console.log("IMAGE", image);
  };

  const handleDropzoneGalleryOnChangeStatus = (fileWithMeta, status) => {
    if (status === "done" || status === "removed") {
      for (const file in fileWithMeta) {
        if (file === "file") {
          if (status === "done") {
            if (postCarousel.includes(fileWithMeta[file])) {
              return;
            }
            postCarousel.push(fileWithMeta[file]);
          } else {
            const imgIndex = postCarousel.indexOf(fileWithMeta[file]);
            postCarousel.splice(imgIndex, 1);
          }
        }
      }

      console.log("POST CAROUSEL", postCarousel);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userStatus.user.userStatus !== "admin") {
      return alert("Nu ai drepturi pentru a edita sau adauga articole!");
    }
    
    if (!image.length) {
      return alert("E musai sa ai o imagine principala!");
    }

    const formData = new FormData();
    formData.append("title", convertedTitle);
    formData.append("content", convertedContent);
    formData.append("link", link);
    formData.append("imageUrl", image[0]);
    for (let i = 0; i < postCarousel.length; i++) {
      formData.append("postCarousel", postCarousel[i]);
    }

    console.log("SUBMIT IMAGE", image);
    console.log("SUBMIT POST CAROUSEL", postCarousel);


    if (!post[0]) {
      dispatch(addPost(formData));
      router.push("/");
    } else {
      dispatch(updatePost(formData, post[0].id));
      router.push(`/post/${post[0].id}`);
    }
  };

  return (
    <div>
      <Meta title="Add Post" />
      <h1>
        {router.query.addEditPost === "addPost"
          ? "Adauga o Postare"
          : "Editeaza Postarea"}
      </h1>
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
          <DropzoneUploader
            onChangeStatus={handleDropzonePosterOnChangeStatus}
            initialFiles={image}
            maxFiles={1}
          />
          {/* <label>
            Poster
            <input
              type="file"
              accept="image/*"
              className="post-input"
              name="imageUrl"
              title="alege o imagine"
              onChange={imageHandler}
              // multiple
            />
          </label>
          {(post[0] || image) && !removeImage ? (
            <div className={addPostStyles.image_thumbnail}>
              <img
                src={
                  post[0] && !image
                    ? `${process.env.API_URL}/${post[0].imageUrl}`
                    : previewImage
                }
                alt=""
                id="preview-image"
              />
              <div
                className={addPostStyles.remove_image}
                onClick={handleRemoveImage}
              >
                X
              </div>
            </div>
          ) : null}
          {!removeImage &&
            (post[0] && !image ? (
              <p>{post[0].imageUrl.split("-")[1]}</p>
            ) : (
              image && <p>{image.name}</p>
            ))} */}
          <DropzoneUploader
            onChangeStatus={handleDropzoneGalleryOnChangeStatus}
            initialFiles={postCarousel}
          />
          {/* <label>
            Carousel
            <input
              type="file"
              accept="image/*"
              className="post-input"
              name="postCarousel"
              title="alege o imagine"
              onChange={carouselImageHandler}
              multiple
            />
          </label> */}
        </div>
        <a href="#" onClick={submitHandler}>
          {post[0] ? "Salveaza modificarile" : "Adauga postarea"}
        </a>
      </form>
    </div>
  );
};

export default addPostPage;
