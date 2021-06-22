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

const CustomerListResults = ({
  handleDelete,
  handleEdit,
  handleBlock,
  customers,
  ...rest
}) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [exportData, setExportData] = useState();

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

  const handleBlockUsers = () => {
    handleBlock(selectedCustomerIds);
  };

  const handleEditUser = () => {
    handleEdit(selectedCustomerIds);
  };

  const handleData = () => {
    let yoo = customers.map(customer => {
      return {
        email: customer.email,
        phone: customer.phone.toString(),
        location: customer.location,
        phoneVerified:
          customer.phoneVerified === true ? 'Verified' : 'Not Verified',
        emailVerified:
          customer.emailVerified === true ? 'Verified' : 'Not Verified',
        block: customer.block === true ? 'Blocked' : 'Not Blocked',
        favourites: customer.favourites
      };
    });
    console.log(yoo);
    return yoo;
  };

  useEffect(() => {
    let Data = handleData();
    setExportData(Data);
  }, []);

  return (
    <div>
      {console.log(selectedCustomerIds)}

      <div className="d-flex justify-content-end">
        <CsvDownload
          data={exportData}
          filename="exported Data.csv"
          // style={{
          //   //pass other props, like styles
          //   boxShadow: 'inset 0px 1px 0px 0px #e184f3',
          //   background: 'linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)',
          //   backgroundColor: '#c123de',
          //   borderRadius: '6px',
          //   border: '1px solid #a511c0',
          //   display: 'inline-block',
          //   cursor: 'pointer',
          //   color: '#ffffff',
          //   fontSize: '15px',
          //   fontWeight: 'bold',
          //   padding: '6px 15px',
          //   textDecoration: 'none',
          //   textShadow: '0px 1px 0px #9b14b3',
          //   height: '35px'
          // }}
          className="btn btn-primary btn-sm m-2"
        >
          Export Users Data <i class="fas fa-cloud-download-alt"></i>
        </CsvDownload>
        <button
          className="btn btn-warning m-2"
          disabled={selectedCustomerIds.length > 0 ? false : true}
          onClick={handleBlockUsers}
        >
          Block <i class="fas fa-ban"></i>
        </button>
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
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  {/* <TableCell>Location</TableCell> */}
                  <TableCell>Phone</TableCell>

                  <TableCell>Email Verified</TableCell>
                  <TableCell>Phone Verified</TableCell>
                  <TableCell>Block</TableCell>
                </TableRow>
              </TableHead>
              {customers.length === 0 ? (
                <div>No User Found</div>
              ) : (
                <TableBody>
                  {customers.map(customer => (
                    <TableRow
                      hover
                      key={customer._id}
                      selected={
                        selectedCustomerIds.indexOf(customer._id) !== -1
                      }
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={
                            selectedCustomerIds.indexOf(customer._id) !== -1
                          }
                          onChange={event =>
                            handleSelectOne(event, customer._id)
                          }
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
                          <Avatar src={customer.profileImage} sx={{ mr: 2 }}>
                            {getInitials(customer.username)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {customer.username}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      {/* <TableCell>
                      {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                    </TableCell> */}
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>
                        {customer.emailVerified ? 'Verified' : 'Not Verified'}
                      </TableCell>
                      <TableCell>
                        {customer.phoneVerified ? 'Verified' : 'Not Verified'}
                      </TableCell>
                      <TableCell>
                        {customer.block ? 'Blocked' : 'Not Blocked'}
                      </TableCell>
                      {/* <TableCell>
                      {moment(customer.createdAt).format('DD/MM/YYYY')}
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
          count={customers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        /> */}
      </Card>
    </div>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
