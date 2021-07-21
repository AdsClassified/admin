import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { editPopup } from '../../Connection/Auth';
import { ToastContainer, toast } from 'react-toastify';
import Imagepicker from '../Imagepicker';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Editcategory({
  data,
  handleOpen,
  open,
  handleUpdate,
  handleEdit,
  handleClose
}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    title: data.title,
    link: data.link,
    id: data._id,
    description: data.description,
    image: data.image
  });

  const handleChange = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  // const handleSubCategoryChange = (evt, id) => {
  //   console.log(evt.target.value, id);

  //   let newSubs = values.subcategories.map(sub => {
  //     if (sub.id === id) {
  //       console.log('iniFFFF');
  //       let yoo = { subTitle: evt.target.value, id: id };
  //       console.log(yoo);
  //       return yoo;
  //     } else {
  //       console.log('in else');
  //       return sub;
  //     }
  //   });

  //   console.log(newSubs);

  //   setValues({
  //     ...values,
  //     subcategories: newSubs
  //   });
  // };

  const handleSelectedImage = async image => {
    console.log(image);

    setValues({
      ...values,
      image: image
    });
  };

  const handleEditSubmit = async () => {
    console.log(values);
    handleClose();
    let res = await editPopup(values);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
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
        <DialogTitle id="form-dialog-title">Edit Popup</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Popup Details</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Popup Title"
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
            name="link"
            value={values.link}
            onChange={handleChange}
            label="Link"
            // placeholder="Seprate them by commas"
            type="text"
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="newSubCategories"
            value={values.description}
            onChange={handleChange}
            label="Description"
            // placeholder="Seprate them by commas"
            type="text"
            fullWidth
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            name="icon"
            value={values.}
            onChange={handleChange}
            label="Add Icon code"
            placeholder="Only add Font Awesome Icon Class Code"
            type="text"
            fullWidth
          /> */}
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
          <Imagepicker selectedImages={handleSelectedImage} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
