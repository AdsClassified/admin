import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  }
}));

export default function Avatarimage({ username, image }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar src={image ? image : ''} className={classes.large} />
      <h4 className="mt-3">{username}</h4>
    </div>
  );
}
