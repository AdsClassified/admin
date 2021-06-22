import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
// import { API_BASE_URL } from 'src/utils/API_URLS';
// import { withRouter } from 'react-router';
// import { toast } from "react-toastify";

const AuthContext = createContext({});

const AuthProvider = props => {
  useEffect(() => {
    if (window.localStorage.getItem('accessToken')) {
      setLoggedIn(true);
    }
  }, []);

  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem('accessToken') ? true : false
  );
  const [ads, setAds] = useState([]);
  console.log(loggedIn);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    console.log('cliked');
    window.localStorage.clear();
    setLoggedIn(false);

    // toast.success("You are logged out", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
  };

  const authContextValue = { loggedIn, login, logout, ads, setAds };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
