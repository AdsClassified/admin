import axios from 'axios';
let url = 'http://localhost:3001';

const loginUser = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/users/login`, data);
  console.log(res);
  return res;
};

export { loginUser };
