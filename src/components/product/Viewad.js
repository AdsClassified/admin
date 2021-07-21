import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Carousal from '../Carousal';
import Avatarimage from '../Avatarimage';
// import { getAd } from "../Connection/Placead";
import { Link } from 'react-router-dom';
import Showadmap from './Showadmap';
// import { getImages } from '../../Connection/Ads';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Viewad({ open, handleOpen, data, images }) {
  const classes = useStyles();
  const [seeNumber, setSeeNumber] = useState(false);
  // const [images, setImages] = useState();
  //   const [data, setData] = useState();

  const handleSeeNumber = () => {
    setSeeNumber(true);
  };

  const handleMessage = () => {};

  //   useEffect(() => {
  //     const fetchAd = async (id) => {
  //       let res = await getAd({ id });
  //       console.log(res);
  //       if (res.data.success === true) {
  //         setData(res.data.ad[0]);
  //       }
  //     };
  //     if (location.state === undefined) {
  //       fetchAd(match.params.id);
  //     } else {
  //       setData(location.state);
  //     }
  //   }, [location.state]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     let res = await getImages({ adId: data._id });
  //     console.log(res);
  //     setImages(res.data.images[0].images);
  //     // setFilterImages(res.data.images);
  //     // setLoading(false);
  //   };
  //   fetchImages();
  // }, []);

  return (
    <div>
      {console.log(images)}
      <Dialog
        fullScreen
        open={open}
        onClose={handleOpen}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOpen}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Ad Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleOpen}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
          {/* {console.log(location)} */}
          <br />
          <br />
          <br />
          <div>
            <div className="container-fluid">
              {data && (
                <div className="row mx-2">
                  <div className="col-12 col-md-8 col-lg-7 text-left">
                    {images && <Carousal image={images} />}

                    <br />
                    <h1>{data.title}</h1>
                    <h3 className="mt-3">{data.price}</h3>
                    <h5>{data.date}</h5>
                    <br />
                    <br />
                    <br />
                    <hr />
                    <div>
                      <h2>Description</h2>
                      <br />
                      <p>{data.description}</p>
                    </div>
                    <br />
                    <br />
                    <hr />
                    <div>
                      <h2>Location</h2>
                      <br />
                      {/* <p>MAP WOULD BE THERE</p> */}
                      {data.location && <Showadmap data={data.location} />}
                    </div>
                    <br />
                    <br />
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Avatarimage username={data.contactDetails.firstName} />
                      <div>
                        <Link
                          to={{
                            pathname: `/sendmessage`,
                            state: {
                              data: data
                            }
                          }}
                        >
                          {' '}
                          <button className="btn btn-outline-primary btn-lg  m-2  ">
                            Contact
                          </button>
                        </Link>
                      </div>
                    </div>
                    <br />
                    <br />
                    <br />
                  </div>
                  <div className="col-12 col-md-4 col-lg-5">
                    <div
                      style={{
                        height: '300px',
                        border: '3px solid #F4F6F7',
                        borderRadius: '12px',
                        position: 'relative'
                      }}
                      className="text-center p-4 shadow-sm"
                    >
                      <br />

                      <Avatarimage username={data.contactDetails.firstName} />
                      <br />
                      <br />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 35,
                          left: '0',
                          right: '0'
                        }}
                        className=""
                      >
                        <button
                          className="btn btn-outline-primary mr-1  btn-lg mb-2"
                          style={{ width: '200px' }}
                          onClick={handleSeeNumber}
                        >
                          {seeNumber ? data.contactDetails.phone : 'See Number'}
                        </button>
                        <Link
                          to={{
                            pathname: `/sendmessage`,
                            state: {
                              data: data
                            }
                          }}
                        >
                          {/* <button
                            className="btn btn-primary ml-1 btn-lg mb-2"
                            style={{ width: '200px' }}
                            onClick={handleMessage}
                          >
                            Message
                          </button> */}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
