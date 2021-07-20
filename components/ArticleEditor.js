import React, { Component, useState } from "react";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
// import apiClient from '../api/api_client'
import { convertFromRaw, convertToRaw } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ArticleEditor = (props) => {
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     editorState: EditorState.createEmpty()
  //   };
  // }

  // const onEditorStateChange = (editorState) => {
  //   setEditorState(editorState);
  //   // this.setState({
  //   //   editorState,
  //   // });
  //   // console.log(editorState);
  //   props.handleContent(
  //       convertToRaw(editorState.getCurrentContent()
  //   ));
  // };

  // uploadImageCallBack = async (file) => {
  //   const imgData = await apiClient.uploadInlineImageForArticle(file);
  //   return Promise.resolve({ data: {
  //     link: `${process.env.NEXT_PUBLIC_API_URL}${imgData[0].formats.small.url}`
  //   }});
  // }

  // const { editorState } = this.state;
  return (
    <Editor
      editorState={props.editorState}
      toolbarClassName="toolbar-class"
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      onEditorStateChange={props.onEditorStateChange}
      // toolbarOnFocus
      toolbar={{
        options: [
          "inline",
          "blockType",
          "fontSize",
          "fontFamily",
          "list",
          "textAlign",
          "colorPicker",
          "link",
          "emoji",
          "history"
        ],
        inline: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "monospace",
            "superscript",
            "subscript"
          ]
        },
        list: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ["unordered", "ordered", "indent", "outdent"]
        },
        textAlign: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ["left", "center", "right", "justify"]
        },
        link: { inDropdown: false },
        history: { inDropdown: false },
        image: {
          urlEnabled: true,
          uploadEnabled: true,
          // uploadCallback: this.uploadImageCallBack,
          previewImage: true,
          alt: { present: false, mandatory: false }
        },
        colorPicker: {
          colors: [
            "rgb(97,189,109)",
            "rgb(26,188,156)",
            "rgb(84,172,210)",
            "rgb(44,130,201)",
            "rgb(147,101,184)",
            "rgb(71,85,119)",
            "rgb(204,204,204)",
            "rgb(65,168,95)",
            "rgb(0,168,133)",
            "rgb(61,142,185)",
            "rgb(41,105,176)",
            "rgb(85,57,130)",
            "rgb(40,50,78)",
            "rgb(0,0,0)",
            "rgb(247,218,100)",
            "rgb(251,160,38)",
            "rgb(235,107,86)",
            "rgb(226,80,65)",
            "rgb(163,143,132)",
            "rgb(239,239,239)",
            "rgb(255,255,255)",
            "rgb(250,197,28)",
            "rgb(243,121,52)",
            "rgb(209,72,65)",
            "rgb(184,49,47)",
            "rgb(124,112,107)",
            "rgb(209,213,216)"
          ]
        }
      }}
    />
  );
};

export default ArticleEditor;
