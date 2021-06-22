import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Adduser from './Adduser';

const CustomerListToolbar = props => {
  const [openAddUser, setOpenAddUser] = React.useState(false);

  const handleOpenAddUser = () => {
    setOpenAddUser(!openAddUser);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {/* <Button>Import</Button>
        <Button sx={{ mx: 1 }}>Export</Button> */}
        {/* <Button color="primary" variant="contained" onClick={handleOpenAddUser}>
          Add User
        </Button> */}
      </Box>
      {/* <Box sx={{ mt: 3 }}>
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
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box> */}
      {/* <Adduser open={openAddUser} handleOpen={handleOpenAddUser} /> */}
    </Box>
  );
};

export default CustomerListToolbar;
