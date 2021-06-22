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
import { editUsers } from '../../Connection/Users';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Edituser({
  data,
  handleOpen,
  open,
  handleUpdate,
  handleEdit,
  handleClose
}) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: data.email,
    emailVerified: data.emailVerified,
    phone: data.phone,
    phoneVerified: data.phoneVerified,
    username: data.username,
    userId: data._id
  });

  const handleChange = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleEditSubmit = async () => {
    console.log(values);
    handleClose();
    let res = await editUsers(values);
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
      {console.log(data)}
      <Dialog
        open={open}
        onClose={handleOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit User Details</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            name="email"
            value={values.email}
            onChange={handleChange}
            disabled
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone"
            type="number"
            fullWidth
            fullWidth
            name="phone"
            value={values.phone}
            onChange={handleChange}
            disabled
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="username"
            type="text"
            fullWidth
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <br />
          <br />
          <FormControl variant="outlined" className="w-100">
            <InputLabel id="demo-simple-select-outlined-label">
              Email Verified
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={values.emailVerified}
              onChange={handleChange}
              label="Email Verified"
              name="emailVerified"
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />
          <FormControl variant="outlined" className="w-100">
            <InputLabel id="demo-simple-select-outlined-label">
              Phone Verified
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={values.phoneVerified}
              onChange={handleChange}
              label="Phone Verified"
              name="phoneVerified"
              fullWidth
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Edit User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
