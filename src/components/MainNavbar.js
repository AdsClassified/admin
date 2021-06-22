import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
// import Logo from './Logo';
import Logo from '../Assets/2nd hand logo 3.png';

const MainNavbar = props => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
        {/* <Logo /> */}
        <img style={{ width: '175px' }} className="img-fluid" src={Logo} />
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
