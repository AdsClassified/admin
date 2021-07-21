import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Popuptable from 'src/components/Popup/Popuptable';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import customers from 'src/__mocks__/customers';
import {
  getPopupData,
  deletePopup
  // editCategories
} from '../Connection/Auth';
import { ToastContainer, toast } from 'react-toastify';
import Editpopup from '../components/Popup/Editpopup';
import {
  Avatar,
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
import { Search as SearchIcon } from 'react-feather';

const Popup = () => {
  const [data, setData] = useState();
  const [update, setUpdate] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [editData, setEditData] = useState();
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleDelete = async ids => {
    console.log(ids);
    let res = await deletePopup({ ids: ids });
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
    }
  };

  const handleCloseEditUser = () => {
    setOpenEditCategory(false);
    setEditData('');
  };

  const handleOpenEditUser = ids => {
    console.log(ids);
    let editData = data.filter(user => {
      return user._id === ids[0];
    });
    setEditData(editData[0]);
    setOpenEditCategory(!openEditCategory);
  };

  //   const handleSearchChange = evt => {
  //     let yoo;
  //     setSearchValue(evt.target.value);
  //     yoo = categories.filter(user => {
  //       return user.title.toLowerCase().includes(evt.target.value.toLowerCase());
  //     });
  //     // console.log(yoo);
  //     setSearch(yoo);
  //   };

  useEffect(() => {
    const fetchPopupData = async () => {
      console.log('fetching popup');
      let foundPopupData = await getPopupData();

      console.log(foundPopupData);
      setData(foundPopupData.data.popup);
      // setLoading(false);
    };
    fetchPopupData();
    setUpdate(false);
  }, [update === true]);
  return (
    <>
      <Helmet>
        <title>Customers | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          {/* <div className="my-2">
            <Box sx={{ mt: 3 }}>
              <Card>
                <CardContent>
                  <Box sx={{ maxWidth: 500 }}>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon fontSize="small" color="action">
                              <SearchIcon />
                              <i class="fas fa-search"></i>
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      placeholder="Search Category"
                      variant="outlined"
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </div> */}
          <Box sx={{ pt: 3 }}>
            {data && (
              <Popuptable
                customers={data}
                handleDelete={handleDelete}
                handleEdit={handleOpenEditUser}
                handleUpdate={handleUpdate}
                // handleBlock={handleBlock}
              />
            )}
          </Box>
          {console.log(editData)}
          {editData && (
            <Editpopup
              data={editData}
              open={openEditCategory}
              handleOpen={handleOpenEditUser}
              handleUpdate={handleUpdate}
              //   handleEdit={handleEditSubmit}
              handleClose={handleCloseEditUser}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default Popup;
