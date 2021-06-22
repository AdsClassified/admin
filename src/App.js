import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { Authroutes, UnAuthroutes } from 'src/routes';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './Context/Auth-Context';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const Authrouting = useRoutes(Authroutes);
  const UnAuthrouting = useRoutes(UnAuthroutes);
  const { loggedIn, login, logout, setAds, ads } = useAuth();
  console.log(loggedIn);

  if (loggedIn) {
    // login();
    return (
      <ThemeProvider theme={theme}>
        <ToastContainer
          style={{
            width: '400px',
            textAlign: 'center',
            fontSize: '1.3em'
          }}
        />
        <GlobalStyles />
        {Authrouting}
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <ToastContainer
          style={{
            width: '400px',
            textAlign: 'center',
            fontSize: '1.3em'
          }}
        />
        <GlobalStyles />
        {UnAuthrouting}
      </ThemeProvider>
    );
  }
};

export default App;
