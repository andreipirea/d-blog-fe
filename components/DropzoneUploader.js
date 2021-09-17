import Dropzone from 'react-dropzone-uploader'
import { useEffect } from 'react';


const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
  return (
    <div>
      {previews}

      <div {...dropzoneProps}>
        {files.length < maxFiles && input}
      </div>

      {files.length > 0 && submitButton}
    </div>
  )
}

const DropzoneUploader = (props) => {
  // let filesParams = [];

  const getUploadParams = (fileWithMeta) => {
    // filesParams.push(fileWithMeta.file);
    // console.log("upload params", filesParams);
   return { url: 'https://httpbin.org/post' };
  }

  // const handleSubmit = (files, allFiles) => {
  //   console.log("multiple files", files.map(f => f));
  //   allFiles.forEach(f => f.remove());
  // }

  // const handleOnChangeStatus = (fileWithMeta, status) => {
  //   console.log("status", status);
  //   if (status === "done" || status === "removed") {
  //     for (const file in fileWithMeta) {
  //       if (file === "file") {
  //         if (status === "done") {
  //           filesParams.push(fileWithMeta[file]);
  //         } else {
  //           filesParams.splice(fileWithMeta[file], 1);
  //         }
  //       }
  //     }
  //     // filesParams = [...fileWithMeta];
  //     console.log("file with meta", filesParams);
  //   }
  // }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={props.onChangeStatus}
      initialFiles={props.initialFiles}
      maxFiles={props.maxFiles}
      // LayoutComponent={Layout}
      // onSubmit={props.onSubmit}
      // classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
      inputContent="Drop Files (Custom Layout)"
      accept="image/*"
    />
  )
}

export default DropzoneUploader;