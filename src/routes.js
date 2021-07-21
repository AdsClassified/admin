import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Featureadsrequests from 'src/pages/Featureadsrequests';
import Featureads from 'src/pages/Featureads';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import Categories from './pages/Categories';
import Adsapproval from './pages/Adsapproval';
import Popup from './pages/Popup';

export const Authroutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'users', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'adsapproval', element: <Adsapproval /> },
      { path: 'ads', element: <ProductList /> },
      { path: 'featureadsrequests', element: <Featureadsrequests /> },
      { path: 'featureads', element: <Featureads /> },
      { path: 'categories', element: <Categories /> },
      { path: 'popup', element: <Popup /> },
      { path: 'settings', element: <Settings /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export const UnAuthroutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/login" /> }
    ]
  }
];
