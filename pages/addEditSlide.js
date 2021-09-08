import Meta from "../components/Meta";
import addPostStyles from "../styles/AddPost.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useEffect } from "react";

import ArticleEditor from "../components/ArticleEditor";

import { convertToRaw } from "draft-js";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/router";
import { addSlide, updateSlide } from "../redux/actions/slidesActions";
import { useSelector, useDispatch } from "react-redux";

const addSlidePage = () => {
  const router = useRouter();
  const slides = useSelector((state) => state.slidesReducer);
  const userStatus = useSelector(state => state.authReducer);
  const slide = slides.filter((p) => p.id == router.query.slideId);

  const contentDataStateTitle =
    slide[0] &&
    ContentState.createFromBlockArray(convertFromHTML(slide[0].title !== undefined ? slide[0].title : ""));
  const contentDataStateContent =
    slide[0] &&
    ContentState.createFromBlockArray(convertFromHTML(slide[0].content !== undefined ? slide[0].content : ""));
  const editorDataStateTitle =
    contentDataStateTitle &&
    EditorState.createWithContent(contentDataStateTitle);
  const editorDataStateContent =
    contentDataStateContent &&
    EditorState.createWithContent(contentDataStateContent);

  const [titleEditorState, setTitleEditorState] = useState(
    router.query.slideId ? editorDataStateTitle : () => EditorState.createEmpty()
  );
  const [contentEditorState, setContentEditorState] = useState(
    router.query.slideId
      ? editorDataStateContent
      : () => EditorState.createEmpty()
  );
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();

  let convertedTitle;
  let convertedContent;

  useEffect(() => {

      console.log("router query",  router.query);

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



  const imageHandler = (e) => {
    setImage(e.target.files[0] ? e.target.files[0] : "");

    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };



  const submitHandler = async (e) => {
    e.preventDefault();
    if (userStatus.user && userStatus.user.userStatus !== "admin") {
        return alert("Nu aveti drepturi pentru a edita sau adauga articole!");
    }
    console.log("SLIDE ADDED!");
    const formData = new FormData();
    formData.append("title", convertedTitle);
    formData.append("content", convertedContent);
    formData.append("imageUrl", image);


    if (!slide[0]) {
      dispatch(addSlide(formData));
      router.push("/");
    } else {
      dispatch(updateSlide(formData, slide[0].id));
      console.log("FORM DATA", formData);
      router.push("/");
    }
  };

  return (
    <div>
      <Meta title="Add Slide" />
      <h1>
        {router.query.addEditSlide === "addSlide"
          ? "Adauga un slide"
          : "Editeaza Slide-ul"}
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
            Imaginea de fundal a slide-ului
            <input
              type="file"
              accept="image/*"
              className="post-input"
              name="imageUrl"
              title="alege o imagine"
              onChange={imageHandler}
            />
          </label>
          {(slide[0] || image) ? (
              <div className={addPostStyles.image_thumbnail}>
                <img
                  src={
                    slide[0] && !image
                      ? `${process.env.API_URL}/${slide[0].imageUrl}`
                      : previewImage
                  }
                  alt=""
                  id="preview-image"
                />
              </div>
            ) : null }
          { (slide[0] && !image) ? (
            <p>{slide[0].imageUrl.split("-")[1]}</p>
          ) : (
            image && <p>{image.name}</p>
          )}
        </div>
        <a href="#" onClick={submitHandler}>
          {slide[0] ? "Salveaza modificarile" : "Adauga slide-ul"}
        </a>
      </form>
    </div>
  );
};

export default addSlidePage;
