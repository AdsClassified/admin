import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
import products from 'src/__mocks__/products';
import {
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Adslist from '../components/product/Adslist';
import {
  getAdsApproval,
  deleteAds,
  rejectAds,
  approveAds,
  activeAds,
  deActiveAds
} from '../Connection/Ads';
import { ToastContainer, toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Featureadsrequestslist from '../components/product/Featureadsrequestslist';
import Loader from '../components/Loader';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Adsapproval = () => {
  const classes = useStyles();
  const [ads, setAds] = useState();
  const [update, setUpdate] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [editData, setEditData] = useState();
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState('');
  const [filterAds, setFilterAds] = useState('');
  const [loading, setLoading] = useState(true);

  const handleUpdate = ids => {
    let yoo = ads.filter(ad => !ids.includes(ad._id));
    setAds(yoo);
  };

  const handleDelete = async ids => {
    console.log(ids);
    let res = await deleteAds({ ids: ids });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      // setDeleteData(ids);
      handleUpdate(ids);
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
    let editData = ads.filter(ad => {
      return ad._id === ids[0];
    });
    setEditData(editData[0]);
    setOpenEditUser(!openEditUser);
  };

  const handleReject = async ids => {
    console.log(ids);
    let res = await rejectAds({ ids: ids });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      setUpdate(true);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleApprove = async ids => {
    console.log(ids);
    let res = await approveAds({ ids: ids });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      setUpdate(true);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleActive = async ids => {
    console.log(ids);
    let res = await activeAds({ id: ids[0] });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      setUpdate(true);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleDeActive = async ids => {
    console.log(ids);
    let res = await deActiveAds({ id: ids[0] });
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
      setUpdate(true);
    } else {
      toast.error(res.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleSearchChange = evt => {
    let yoo;
    setSearchValue(evt.target.value);
    yoo = ads.filter(ad => {
      return ad.title.toLowerCase().includes(evt.target.value.toLowerCase());
    });
    // console.log(yoo);
    setSearch(yoo);
  };

  const handleFilterChange = evt => {
    console.log(evt.target.value);
    const { value } = evt.target;

    console.log(value);
    if (value === 'All') {
      setAds(filterAds);
    } else if (value === 'Approved') {
      let filteredAds = filterAds.filter(ad => {
        return ad.approved === true;
      });
      setAds(filteredAds);
    } else if (value === 'Rejected') {
      let filteredAds = filterAds.filter(ad => {
        return ad.rejected === true;
      });
      setAds(filteredAds);
    } else if (value === 'Active') {
      let filteredAds = filterAds.filter(ad => {
        return ad.active === true;
      });
      setAds(filteredAds);
    } else if (value === 'De Active') {
      let filteredAds = filterAds.filter(ad => {
        return ad.active === false;
      });
      setAds(filteredAds);
    } else if (value === 'Sold') {
      let filteredAds = filterAds.filter(ad => {
        return ad.sold === true;
      });
      setAds(filteredAds);
    }
  };

  const handleUpdateData = () => {
    setUpdate(true);
  };

  useEffect(() => {
    const fetchAds = async () => {
      let res = await getAdsApproval();
      console.log(res);
      setAds(res.data.ads);
      setFilterAds(res.data.ads);
      setLoading(false);
    };
    fetchAds();
    setUpdate(false);
  }, [update === true]);
  return (
    <>
      <Helmet>
        <title>Ads | Material Kit</title>
      </Helmet>
      {loading === true ? (
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3
          }}
        >
          <Container maxWidth={false}>
            <ProductListToolbar />
            <div>
              {ads.length > 0 ? (
                <Box sx={{ mt: 3 }}>
                  <Card>
                    <CardContent>
                      <Box
                        className="d-flex justify-content-between"
                        sx={{ maxWidth: 950 }}
                      >
                        <TextField
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SvgIcon fontSize="small" color="action">
                                  <SearchIcon />
                                </SvgIcon>
                              </InputAdornment>
                            )
                          }}
                          placeholder="Search product"
                          variant="outlined"
                          className="mx-2"
                          name="search"
                          value={searchValue}
                          onChange={handleSearchChange}
                        />
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor="outlined-age-native-simple">
                            Filters
                          </InputLabel>
                          <Select
                            native
                            value={filter}
                            onChange={handleFilterChange}
                            label="Filter"
                            // inputProps={{
                            //   name: 'age',
                            //   id: 'outlined-age-native-simple'
                            // }}
                          >
                            <option value={filter}>{filter}</option>
                            <option value="All">All</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Active">Active</option>
                            <option value="De Active">De Active</option>
                            <option value="Sold">Sold</option>
                          </Select>
                        </FormControl>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ) : null}
            </div>
            <Box sx={{ pt: 3 }}>
              {ads && (
                <Adslist
                  ads={searchValue.length > 0 ? search : ads}
                  handleDelete={handleDelete}
                  handleEdit={handleOpenEditUser}
                  handleReject={handleReject}
                  handleApprove={handleApprove}
                  handleActive={handleActive}
                  handleDeActive={handleDeActive}
                  handleUpdate={handleUpdateData}
                />
              )}
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Adsapproval;
