import axios from 'axios';
let url = 'http://localhost:3001';

const getCategories = async () => {
  console.log('hello');
  let res = await axios.get(`${url}/api/categories/`);
  console.log(res);
  return res;
};

const addCategory = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/categories/add`, data);
  console.log(res);
  return res;
};

const deleteCategories = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/categories/delete`, data);
  console.log(res);
  return res;
};

const editCategories = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/categories/edit`, data);
  console.log(res);
  return res;
};

export { getCategories, deleteCategories, editCategories, addCategory };
