import React, { Component } from "react";
import Meta from "../components/Meta";
import addPostStyles from "../styles/AddEditPost.module.scss";
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
  const [carouselImagesNames, setCarouselImagesNames] = useState(post[0] && post[0].imageGallery != "" ? post[0].imageGallery.split(",") : []);
  const [carouselImagesFiles, setCarouselImagesFiles] = useState([]);

  let convertedTitle;
  let convertedContent;
  // let carouselArray;

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
    // carouselImagesFiles.push(file);
    carouselImagesNames.forEach(imgName => {
      if (file.name === imgName.split("\\")[1]) {
        // postCarousel.splice(carouselImagesNames.indexOf(imgName), 0, file);

        if (!carouselImagesNames.length) {
          carouselImagesFiles.push(file);
        } else {
          carouselImagesFiles.splice(carouselImagesNames.indexOf(imgName), 0, file);
        }
      }
    });
    
    console.log("file array -> ", postCarousel);
  };

  useEffect(() => {
    if (post[0] && post[0].imageUrl != "") {
      getPosterImage(post[0].imageUrl);
    }

    if (post[0] && post[0].imageGallery != "") {
      // carouselArray = post[0].imageGallery.split(",");
      console.log("carousel array ", carouselImagesNames);
      carouselImagesNames.forEach((imgName) => {
        getCarouselImages(imgName);
      });
      setTimeout(() => {
        setPostCarousel(carouselImagesFiles);
      }, 500);
    }
    console.log("post carousel", postCarousel);
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


  const handleDropzonePosterOnChangeStatus = (fileWithMeta, status) => {
    if (status === "done" || status === "removed") {
      if (status === 'done') {
        image.push(fileWithMeta.file);
      } else {
        setImage([]);
      }
    }
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
      // router.push(`/post/${post[0].id}`);
      router.push("/");
    }
  };

  return (
    <div className={addPostStyles.add_post_container}>
      <Meta title="Add Post" />
      <h1 className={addPostStyles.mainTitle}>
        {router.query.addEditPost === "addPost"
          ? "Adauga un articol"
          : "Editeaza articolul"}
      </h1>
      <form id="post-form" method="POST" encType="multipart/form-data">
        <div className={addPostStyles.form_control}>
          <label>
          <p className={addPostStyles.labelText}>Titlu</p>
            <ArticleEditor
              editorState={titleEditorState}
              onEditorStateChange={onTitleEditorStateChange}
            />
          </label>
        </div>
        
        <div className={addPostStyles.form_control}>
          <p className={addPostStyles.labelText}>Imaginea principala articolului</p>
          <DropzoneUploader
            onChangeStatus={handleDropzonePosterOnChangeStatus}
            initialFiles={image}
            maxFiles={1}
          />
        </div> 
        <div className={addPostStyles.form_control}>
          <label>
            <p className={addPostStyles.labelText}>Link youtube&nbsp;</p>
            <input
              className="post-input"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>
        </div>
        <div className={addPostStyles.form_control}>
          <p className={addPostStyles.labelText}>Galerie de imagini</p>
          <DropzoneUploader
            onChangeStatus={handleDropzoneGalleryOnChangeStatus}
            initialFiles={postCarousel}
          />
        </div>
        <div className={addPostStyles.form_control}>
          <label>
            <p className={addPostStyles.labelText}>Descriere</p>
            <ArticleEditor
              editorState={contentEditorState}
              onEditorStateChange={onContentEditorStateChange}
            />
          </label>
        </div>
        <a className={addPostStyles.submitButton} href="#" onClick={submitHandler}>
          {post[0] ? "Salveaza modificarile" : "Adauga articolul"}
        </a>
      </form>
    </div>
  );
};

export default addPostPage;
