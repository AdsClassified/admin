import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Emaildialog({
  open,
  handleOpen,
  email,
  handleEmailSend
}) {
  const [values, setValues] = useState({
    email: email,
    subject: '',
    description: ''
  });

  const handleChange = evt => {
    setValues({
      ...values,
      [evt.target.name]: evt.target.value
    });
  };

  const handleSubmit = () => {
    handleEmailSend(values);
    handleOpen();
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleOpen}
        aria-labelledby="form-dialog-title"
      >
        {console.log(email)}
        <DialogTitle id="form-dialog-title">Send Email to {email}</DialogTitle>
        <DialogContent>
          <DialogContentText>Send Email to the users</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            value={values.email}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Subject"
            type="text"
            fullWidth
            name="subject"
            value={values.subject}
            onChange={handleChange}
          />
          <br />
          <textarea
            type="text"
            placeholder="Enter Details about Email"
            value={values.description}
            name="description"
            onChange={handleChange}
            className="w-100 mt-2 p-2"
            rows="4"
            cols="50"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
