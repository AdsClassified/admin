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
import AddPopup from './Addpopup';
import { addPopup } from '../../Connection/Auth';
import { ToastContainer, toast } from 'react-toastify';

const Categorytable = ({
  handleDelete,
  handleEdit,
  handleAdd,
  customers,
  handleUpdate,
  ...rest
}) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [exportData, setExportData] = useState();
  const [openAddCategory, setOpenAddCategory] = useState(false);

  const handleSelectAll = event => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map(customer => customer.id);
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

  //   const handleBlockUsers = () => {
  //     handleBlock(selectedCustomerIds);
  //   };

  const handleEditUser = () => {
    handleEdit(selectedCustomerIds);
  };

  const handleOpenAddCategory = () => {
    setOpenAddCategory(!openAddCategory);
  };

  const handleAddCategory = async data => {
    console.log(data);
    let res = await addPopup(data);
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

  return (
    <div>
      {console.log(selectedCustomerIds)}

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-danger m-2"
          disabled={selectedCustomerIds.length > 0 ? false : true}
          onClick={handleDeleteUsers}
        >
          Delete <i class="far fa-trash-alt"></i>
        </button>
        <button
          className="btn btn-primary m-2"
          disabled={selectedCustomerIds.length === 1 ? false : true}
          onClick={handleEditUser}
        >
          Edit <i class="far fa-edit"></i>
        </button>
        {customers.length === 0 && (
          <button
            className="btn btn-success m-2"
            //   disabled={selectedCustomerIds.length === 1 ? false : true}
            onClick={handleOpenAddCategory}
          >
            Add <i class="fas fa-plus"></i>{' '}
          </button>
        )}
      </div>
      <Card {...rest}>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === customers.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0 &&
                        selectedCustomerIds.length < customers.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map(customer => (
                  <TableRow
                    hover
                    key={customer._id}
                    selected={selectedCustomerIds.indexOf(customer._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedCustomerIds.indexOf(customer._id) !== -1
                        }
                        onChange={event => handleSelectOne(event, customer._id)}
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
                        {/* <Avatar src={customer.profileImage} sx={{ mr: 2 }}>
                          {getInitials(customer.title)}
                        </Avatar> */}
                        <Typography color="textPrimary" variant="body1">
                          {customer.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    {/* {customer.subcategories.map(sub => {
                      return <TableCell>{sub.subTitle}</TableCell>;
                    })} */}
                    <TableCell>{customer.link}</TableCell>
                    <TableCell>{customer.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        {/* <TablePagination
          component="div"
          count={customers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        /> */}
        {openAddCategory && (
          <AddPopup
            open={openAddCategory}
            handleOpen={handleOpenAddCategory}
            handleSubmit={handleAddCategory}
          />
        )}
      </Card>
    </div>
  );
};

Categorytable.propTypes = {
  customers: PropTypes.array.isRequired
};

export default Categorytable;
