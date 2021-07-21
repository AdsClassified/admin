import axios from 'axios';
let url = 'http://localhost:3001';
// let url = 'https://adsbackendapp.herokuapp.com';

const loginUser = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/users/login`, data);
  console.log(res);
  return res;
};

const getPopupData = async () => {
  // console.log(data);
  let res = await axios.get(`${url}/api/popup`);
  console.log(res);
  return res;
};

const addPopup = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/popup/add`, data);
  console.log(res);
  return res;
};

const deletePopup = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/popup/delete`, data);
  console.log(res);
  return res;
};

const editPopup = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/popup/edit`, data);
  console.log(res);
  return res;
};

export { loginUser, getPopupData, addPopup, deletePopup, editPopup };
