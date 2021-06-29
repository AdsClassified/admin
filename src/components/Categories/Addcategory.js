import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { values } from 'lodash-es';
import Imagepicker from '../Imagepicker';
import Avatarimage from '../Avatarimage';

export default function Addcategory({ open, handleOpen, handleSubmit }) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleOpen = () => {
  //     setOpen(false);
  //   };

  const [values, setValues] = useState({
    title: '',
    subcategories: '',
    icon: '',
    image: ''
  });

  const handleChange = evt => {
    const { name, value } = evt.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSelectedImage = async image => {
    console.log(image);

    setValues({
      ...values,
      image: image
    });

    // setUserData({ ...userData, image: image });
    // // window.localStorage.setItem("image", image);

    // let res = await updateImage({
    //   image,
    //   userId: window.localStorage.getItem("id"),
    // });

    // if (res.data.success === true) {
    //   console.log("hello i am working");
    //   // console.log(userData.image);
    //   window.localStorage.setItem("image", image);
    //   toast.success(res.data.message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // } else {
    //   toast.error(res.data.message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // }
  };

  const handleSubmitCategory = () => {
    console.log(values);
    handleSubmit(values);

    handleOpen();
    setValues({
      title: '',
      subcategories: '',
      icon: '',
      image: ''
    });
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open form dialog
      </Button> */}
      {console.log(values)}
      <Dialog
        open={open}
        onClose={handleOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            Add Category
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Title"
            type="text"
            fullWidth
            variant="outlined"
            value={values.title}
            name="title"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="subcategories"
            value={values.subcategories}
            onChange={handleChange}
            label="Sub Categories Titles"
            placeholder="Seprate them by commas"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="icon"
            value={values.icon}
            onChange={handleChange}
            label="Add Icon code"
            placeholder="Only add Font Awesome Icon Class Code"
            type="text"
            fullWidth
          />
          <br />
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            name="image"
            value={values.image}
            onChange={handleChange}
            label="Category Image Link"
            placeholder="Only Add Online Link for the Image"
            type="text"
            fullWidth
          /> */}
          {/* <Avatarimage image={values.image} /> */}
          <div>
            <br />
            {values.image && (
              <img
                src={values.image}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '12px'
                }}
              />
            )}
          </div>
          <br />
          <Imagepicker selectedImages={handleSelectedImage} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitCategory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
