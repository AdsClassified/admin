import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import customers from 'src/__mocks__/customers';
import {
  getUsers,
  deleteUsers,
  editUsers,
  blockUsers
} from '../Connection/Users';
import { ToastContainer, toast } from 'react-toastify';
import Edituser from '../components/customer/Edituser';
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

const CustomerList = () => {
  const [users, setUsers] = useState();
  const [update, setUpdate] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [editData, setEditData] = useState();
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleUpdate = () => {
    setUpdate(true);
  };

  const handleDelete = async ids => {
    console.log(ids);
    let res = await deleteUsers({ ids: ids });
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
    setOpenEditUser(false);
  };

  const handleOpenEditUser = ids => {
    console.log(ids);
    let editData = users.filter(user => {
      return user._id === ids[0];
    });
    setEditData(editData[0]);
    setOpenEditUser(!openEditUser);
  };

  const handleBlock = async ids => {
    console.log(ids);
    let res = await blockUsers({ ids: ids });
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

  const handleSearchChange = evt => {
    let yoo;
    setSearchValue(evt.target.value);
    yoo = users.filter(user => {
      return user.username
        .toLowerCase()
        .includes(evt.target.value.toLowerCase());
    });
    // console.log(yoo);
    setSearch(yoo);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      let res = await getUsers();
      console.log(res);
      setUsers(res.data.users);
    };
    fetchUsers();
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
          <div className="my-2">
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
                              {/* <i class="fas fa-search"></i> */}
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      placeholder="Search User"
                      variant="outlined"
                      value={searchValue}
                      onChange={handleSearchChange}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </div>
          <Box sx={{ pt: 3 }}>
            {users && (
              <CustomerListResults
                customers={searchValue.length > 0 ? search : users}
                handleDelete={handleDelete}
                handleEdit={handleOpenEditUser}
                handleBlock={handleBlock}
              />
            )}
          </Box>
          {editData && (
            <Edituser
              data={editData}
              open={openEditUser}
              handleOpen={handleOpenEditUser}
              handleUpdate={handleUpdate}
              // handleEdit={handleEditSubmit}
              handleClose={handleCloseEditUser}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
