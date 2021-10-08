import React, { Component } from "react";
import Meta from "../components/Meta";
import styles from "../styles/About.module.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useEffect } from "react";
import EditIcon from "@material-ui/icons/Edit";

import ArticleEditor from "../components/ArticleEditor";
import DropzoneUploader from "../components/DropzoneUploader";

import { convertToRaw } from "draft-js";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/router";
import {
  getAboutPage,
  addAboutPage,
  updateAboutPage
} from "../redux/actions/aboutActions";
import {getUser, logout} from '../redux/actions/authActions';

import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";

const about = () => {
  const router = useRouter();
  const userStatus = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAboutPage());
    if (localStorage.getItem('token') !== null) {
      dispatch(getUser());
    }
  }, []);
  const aboutPage = useSelector((state) => state.aboutReducer);

  const contentDataStateTitle =
    aboutPage[0] &&
    ContentState.createFromBlockArray(
      convertFromHTML(
        aboutPage[0].title !== undefined ? aboutPage[0].title : ""
      )
    );
  const contentDataStateContent =
    aboutPage[0] &&
    ContentState.createFromBlockArray(convertFromHTML(aboutPage[0].content));
  const editorDataStateTitle =
    contentDataStateTitle &&
    EditorState.createWithContent(contentDataStateTitle);
  const editorDataStateContent =
    contentDataStateContent &&
    EditorState.createWithContent(contentDataStateContent);

  const [titleEditorState, setTitleEditorState] = useState(
    aboutPage[0] ? editorDataStateTitle : () => EditorState.createEmpty()
  );
  const [contentEditorState, setContentEditorState] = useState(
    aboutPage[0] ? editorDataStateContent : () => EditorState.createEmpty()
  );
  const [image, setImage] = useState([]);
  const [showForm, setShowForm] = useState(false);

  let convertedTitle;
  let convertedContent;
  // let carouselArray;

  const getPosterImage = async (imgFile) => {
    const resImg = await fetch(`${process.env.API_URL}/${imgFile}`);
    const bufImg = await resImg.arrayBuffer();
    const fileImg = new File([bufImg], imgFile.split("\\")[1], {
      type: "image/png"
    });
    setImage([fileImg]);
  };

  useEffect(() => {
    // dispatch(getAboutPage());

    if (aboutPage[0] && aboutPage[0].imageUrl != "") {
      getPosterImage(aboutPage[0].imageUrl);
    }

    console.log("about state", aboutPage);
    // if (aboutPage[0] && aboutPage[0].imageUrl != "") {
    //   getPosterImage(aboutPage[0].imageUrl);
    // }
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
      if (status === "done") {
        image.push(fileWithMeta.file);
      } else {
        setImage([]);
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userStatus.user.userStatus !== "admin") {
      return alert("Nu ai drepturi pentru a edita sau adauga articole!");
    }

    const formData = new FormData();
    formData.append("title", convertedTitle);
    formData.append("content", convertedContent);
    formData.append("imageUrl", image[0]);

    console.log("IMAGE", image);

    if (!aboutPage[0]) {
      dispatch(addAboutPage(formData));
      router.push("/");
    } else {
      dispatch(updateAboutPage(formData, aboutPage[0].id));
      router.push("/");
    }
  };

  return (
    <div className={styles.about_page_container}>
      <Meta title="Add Post" />
      {userStatus.user && userStatus.user.userStatus === "admin" && (
        <div className={styles.admin_icons_container}>
          <EditIcon
            onClick={() => setShowForm(!showForm)}
            style={
              !showForm
                ? {
                    fontSize: 60,
                    color: "#009933",
                    cursor: "pointer",
                    margin: "10px 20px"
                  }
                : {
                    fontSize: 60,
                    color: "#009933",
                    cursor: "pointer",
                    margin: "10px 20px",
                    border: "3px solid green",
                    borderRadius: "10px"
                  }
            }
          />
        </div>
      )}
      <h1 className={styles.mainTitle}>Cine suntem!</h1>
      <div className={styles.about_inner_container}>
        <div className={styles.title_container}>
          {ReactHtmlParser(aboutPage[0] ? aboutPage[0].title : "")}
        </div>
        <div className={styles.content_container}>
          {aboutPage[0]
            ? aboutPage[0].imageUrl && (
                <div className={styles.image_container}>
                  <img
                    src={`${process.env.API_URL}/${aboutPage[0].imageUrl}`}
                  />
                </div>
              )
            : null}
          {ReactHtmlParser(aboutPage[0] ? aboutPage[0].content : "")}
        </div>
        {showForm && (
          <form id="post-form" method="POST" encType="multipart/form-data">
            <div className={styles.form_control}>
              <label>
                <p className={styles.labelText}>Titlu</p>
                <ArticleEditor
                  editorState={titleEditorState}
                  onEditorStateChange={onTitleEditorStateChange}
                />
              </label>
            </div>

            <div className={styles.form_control}>
              <p className={styles.labelText}>
                Imaginea principala articolului
              </p>
              <DropzoneUploader
                onChangeStatus={handleDropzonePosterOnChangeStatus}
                initialFiles={image}
                maxFiles={1}
              />
            </div>
            <div className={styles.form_control}>
              <label>
                <p className={styles.labelText}>Descriere</p>
                <ArticleEditor
                  editorState={contentEditorState}
                  onEditorStateChange={onContentEditorStateChange}
                />
              </label>
            </div>
            <a className={styles.submitButton} href="#" onClick={submitHandler}>
              {aboutPage[0] ? "Modifica" : "Adauga"}
            </a>
          </form>
        )}
      </div>
    </div>
  );
};

export default about;
