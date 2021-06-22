import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import CsvDownload from 'react-json-to-csv';
import { Search as SearchIcon } from 'react-feather';
import Emaildialog from './Emaildialog';
import { emailSend, makeFeatureAd } from '../../Connection/Ads';
import { ToastContainer, toast } from 'react-toastify';
import Viewad from './Viewad';
import Editad from './Editad';
import { removeFeatureAd } from '../../Connection/Ads';

const Featureadslist = ({
  handleDelete,
  // handleEdit,
  handleReject,
  handleApprove,
  handleActive,
  handleDeActive,
  handleUpdate,
  ads,
  ...rest
}) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [exportData, setExportData] = useState();
  const [openEmail, setOpenEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [adData, setAdData] = useState();
  const [editAdData, setEditAdData] = useState();
  const [openEditAd, setOpenEditAd] = useState(false);
  const [openViewAd, setOpenViewAd] = useState(false);

  const handleSelectAll = event => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = ads.map(customer => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteUsers = async () => {
    handleDelete(selectedCustomerIds);
  };

  // const handleBlockUsers = () => {
  //   handleBlock(selectedCustomerIds);
  // };

  const handleActiveAds = () => {
    handleActive(selectedCustomerIds);
  };

  const handleDeActiveAds = () => {
    handleDeActive(selectedCustomerIds);
  };

  const handleApproveAds = () => {
    handleApprove(selectedCustomerIds);
  };

  const handleRejectAds = () => {
    handleReject(selectedCustomerIds);
  };

  const handleOpenEmail = () => {
    let email;
    let yoo = ads.filter(ad => {
      return ad._id === selectedCustomerIds[0];
    });
    console.log(yoo[0].contactDetails.email);
    email = yoo[0].contactDetails.email;
    setEmail(email);
    setOpenEmail(!openEmail);
  };

  const checkValid = () => {
    let yoo = ads.filter(ad => {
      return ad._id === selectedCustomerIds[0];
    });

    console.log(yoo);

    if (yoo[0].reviewed === true && yoo[0].approved === true) {
      console.log('Trueeee');
      return true;
    } else {
      console.log('false');
      return false;
    }
  };

  const handleEmailSend = async data => {
    console.log(data);
    let res = await emailSend(data);
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleOpenViewAd = () => {
    setOpenViewAd(!openViewAd);
  };

  const handleViewAd = ad => {
    console.log(ad);
    setAdData(ad);
    handleOpenViewAd();
  };

  const handleOpenEditAd = () => {
    setOpenEditAd(!openEditAd);
  };

  const handleEditAd = ad => {
    console.log(ad);
    setEditAdData(ad);
    handleOpenEditAd();
  };

  const handleFeature = async (type, data) => {
    console.log(type, data);
    let res = await removeFeatureAd({ id: data._id });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      handleUpdate();
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      handleUpdate();
    }
  };

  return (
    <div>
      {console.log(selectedCustomerIds)}

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-success m-2"
          disabled={selectedCustomerIds.length === 1 ? false : true}
          onClick={handleOpenEmail}
        >
          Send Email <i class="far fa-paper-plane"></i>
        </button>
        <button
          className="btn btn-danger m-2"
          disabled={selectedCustomerIds.length > 0 ? false : true}
          onClick={handleRejectAds}
        >
          Reject <i class="fas fa-times"></i>
        </button>
        <button
          className="btn btn-warning m-2"
          disabled={selectedCustomerIds.length > 0 ? false : true}
          onClick={handleApproveAds}
        >
          Approve <i class="fas fa-check"></i>
        </button>
        <button
          className="btn btn-danger m-2"
          disabled={
            selectedCustomerIds.length === 1 && checkValid() ? false : true
          }
          onClick={handleDeActiveAds}
        >
          De Active <i class="fas fa-times"></i>
        </button>

        <button
          className="btn btn-success m-2"
          disabled={
            selectedCustomerIds.length === 1 && checkValid() ? false : true
          }
          onClick={handleActiveAds}
        >
          Active <i class="fas fa-check"></i>
        </button>
        <button
          className="btn btn-danger m-2"
          disabled={selectedCustomerIds.length > 0 ? false : true}
          onClick={handleDeleteUsers}
        >
          Delete <i class="far fa-trash-alt"></i>
        </button>
        {/* <button
          className="btn btn-primary m-2"
          disabled={selectedCustomerIds.length === 1 ? false : true}
          onClick={handleEditUser}
        >
          Edit <i class="far fa-edit"></i>
        </button> */}
      </div>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === ads.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0 &&
                        selectedCustomerIds.length < ads.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Sold</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Ad Active Status</TableCell>
                  <TableCell>Ad Reviewed</TableCell>
                  <TableCell>Ad Approved </TableCell>
                  <TableCell>Ad Rejected</TableCell>
                  <TableCell>location</TableCell>
                  <TableCell>images</TableCell>
                  <TableCell>Contact Email</TableCell>
                  <TableCell>Contact Phone</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>View Ad</TableCell>
                  <TableCell>Edit Ad</TableCell>
                  <TableCell>Remove From Features</TableCell>
                </TableRow>
              </TableHead>
              {ads.length > 0 && (
                <TableBody>
                  {ads.map(ad => (
                    <TableRow
                      hover
                      key={ad._id}
                      selected={selectedCustomerIds.indexOf(ad._id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomerIds.indexOf(ad._id) !== -1}
                          onChange={event => handleSelectOne(event, ad._id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Avatar src={ad.images[0]} sx={{ mr: 2 }}>
                            {getInitials(ad.title)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {ad.title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{ad.price}</TableCell>
                      <TableCell>{ad.sold ? 'Sold' : 'Not Sold'}</TableCell>
                      {/* <TableCell>
                      {`${ad.address.city}, ${ad.address.state}, ${ad.address.country}`}
                    </TableCell> */}
                      <TableCell>{ad.categoryName}</TableCell>
                      <TableCell>
                        {ad.active ? 'Active' : 'Not Active'}
                      </TableCell>
                      <TableCell>{ad.reviewed ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        {ad.approved ? 'Approved' : 'Not Approved'}
                      </TableCell>
                      <TableCell>
                        {ad.rejected ? 'Rejected' : 'Not Rejected'}
                      </TableCell>
                      <TableCell>{ad.location.address}</TableCell>
                      <TableCell>{ad.images.length}</TableCell>
                      <TableCell>{ad.contactDetails.email}</TableCell>
                      <TableCell>{ad.contactDetails.phone}</TableCell>
                      <TableCell>{ad.created}</TableCell>
                      <TableCell>
                        <button
                          className="btn  btn-success"
                          onClick={() => handleViewAd(ad)}
                        >
                          View Ad
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          className="btn btn-primary m-2"
                          onClick={() => handleEditAd(ad)}
                        >
                          Edit <i class="far fa-edit"></i>
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          className="btn btn-danger m-2"
                          onClick={() => handleFeature('reject', ad)}
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </TableCell>

                      {/* <TableCell>
                      {moment(ad.createdAt).format('DD/MM/YYYY')}
                    </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </Box>
        </PerfectScrollbar>
        {/* <TablePagination
          component="div"
          count={ads.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        /> */}
      </Card>
      {ads.length === 0 && (
        <div className="container text-center">
          <div
            className="p-5 row "
            style={{
              border: '1px solid #F4F6F7'
            }}
          >
            <div className="col-12">
              {ads.length === 0 && (
                <div>
                  <i style={{ fontSize: '35px' }} class="fas fa-box-open"></i>
                  <br />
                  You Have no Ads Online
                  <br />
                  {/* <Link to="/placead">
                        <button
                          className="btn mt-3 "
                          style={{ color: "white", backgroundColor: "#FF6E14" }}
                        >
                          <i class="far fa-plus-square mr-2"></i>
                          Place an ad
                        </button>
                      </Link> */}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {email && (
        <Emaildialog
          open={openEmail}
          handleOpen={handleOpenEmail}
          handleEmailSend={handleEmailSend}
          email={email}
        />
      )}
      {adData && (
        <Viewad data={adData} open={openViewAd} handleOpen={handleOpenViewAd} />
      )}

      {editAdData && (
        <Editad
          data={editAdData}
          open={openEditAd}
          handleOpen={handleOpenEditAd}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

Featureadslist.propTypes = {
  ads: PropTypes.array.isRequired
};

export default Featureadslist;
