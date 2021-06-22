import axios from 'axios';
// let url = 'http://localhost:3001';
let url = 'https://adsbackendapp.herokuapp.com';

const loginUser = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/users/login`, data);
  console.log(res);
  return res;
};

export { loginUser };
