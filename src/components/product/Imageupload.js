import React, { useRef, useState, useEffect } from 'react';
import Carousal from '../Carousal';

// import Button from "../Button/index";

const Imageupload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  const filePickerRef = useRef();

  // useEffect(() => {
  //   if (!file) {
  //     return;
  //   }
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     setPreviewUrl(fileReader.result);
  //   };
  //   fileReader.readAsDataURL(file[0]);
  // }, [file]);

  const pickedImage = async evt => {
    let pickedFile;
    let fileIsValid = isValid;

    if (evt.target.files && evt.target.files.length >= 1) {
      pickedFile = evt.target.files;
      // setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid(false);
    }

    let images = [];
    const base64 = file => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          images.push(fileReader.result);
          resolve(images);
        };
        fileReader.onerror = error => {
          reject(error);
        };
      });
    };

    let i = 0;
    for (const property in pickedFile) {
      if (i < pickedFile.length) {
        const image = await base64(pickedFile[i]);
      }

      i = i + 1;
    }
    setFile(images);
    console.log(images);
    props.selectedImages(images);

    // props.onInput(props.id, images);
  };

  const pickImageHandler = evt => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        id={props.id}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg , .png , .jpeg"
        ref={filePickerRef}
        onChange={pickedImage}
        multiple
      />
      <div>
        <div>
          <div>
            {props.images || file ? (
              <Carousal image={file ? file : props.images} />
            ) : null}

            {/* {previewUrl && (
              <img src={previewUrl} alt="Preview" className="img-thumbnail" />
            )} */}
            {!previewUrl && <p className="ml-3">Upload product Image</p>}
          </div>
          <button onClick={pickImageHandler} className="btn btn-warning ml-3">
            <i class="fas fa-camera-retro px-2"></i>Choose Images
          </button>
          {/* <Button type="button" text="Choose Image" >
            Choose Images
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Imageupload;
