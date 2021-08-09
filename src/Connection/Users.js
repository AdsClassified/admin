import axios from 'axios';
// let url = 'http://localhost:3001';
let url = 'https://adsbackendapi.herokuapp.com';

const getUsers = async () => {
  let res = await axios.get(`${url}/api/users/`);

  console.log(res);
  return res;
};

const deleteUsers = async data => {
  let res = await axios.post(`${url}/api/users/deleteusers`, data);
  console.log(res);
  return res;
};

const blockUsers = async data => {
  let res = await axios.post(`${url}/api/users/blockusers`, data);
  console.log(res);
  return res;
};

const editUsers = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/users/editusers`, data);
  console.log(res);
  return res;
};

export { getUsers, deleteUsers, editUsers, blockUsers };
