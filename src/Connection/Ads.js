import axios from 'axios';
let url = 'http://localhost:3001';
// let url = 'https://adsbackendapp.herokuapp.com';

const getAds = async () => {
  console.log('hello');
  let res = await axios.get(`${url}/api/placead/getads`);
  console.log(res);
  return res;
};

const deleteAds = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/placead/deleteads`, data);
  console.log(res);
  return res;
};

const rejectAds = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/placead/rejectads`, data);
  console.log(res);
  return res;
};

const approveAds = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/placead/approveads`, data);
  console.log(res);
  return res;
};

const activeAds = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/placead/activeads`, data);
  console.log(res);
  return res;
};

const deActiveAds = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/placead/deactiveads`, data);
  console.log(res);
  return res;
};

const emailSend = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/placead/sendemail`, data);
  console.log(res);
  return res;
};

const getAd = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/placead/getad`, data);
  console.log(res);
  return res;
};

const editAd = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/placead/editad`, data);
  console.log(res);
  return res;
};

const getFeatureAdsRequests = async () => {
  // console.log(data);
  let res = await axios.get(`${url}/api/placead/getfeatureadsrequests`);
  console.log(res);
  return res;
};

const getAdsApproval = async () => {
  // console.log(data);
  let res = await axios.get(`${url}/api/placead/getadsapproval`);
  console.log(res);
  return res;
};

const getFeatureAds = async data => {
  let res = await axios.get(`${url}/api/placead/getfeatureads`);
  console.log(res);
  return res;
};

const makeFeatureAd = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/placead/makefeaturead`, data);
  console.log(res);
  return res;
};

const removeFeatureAd = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/placead/removefeaturead`, data);
  console.log(res);
  return res;
};

const countAds = async () => {
  let res = await axios.get(`${url}/api/placead/countads`);
  console.log(res);
  return res;
};

const countFeatureAds = async () => {
  let res = await axios.get(`${url}/api/placead/countfeatureads`);
  console.log(res);
  return res;
};

const countFeatureAdsRequests = async () => {
  let res = await axios.get(`${url}/api/placead/countfeatureadsrequests`);
  console.log(res);
  return res;
};

const adsStats = async data => {
  console.log('hello');
  let res = await axios.get(`${url}/api/placead/adsstats`);
  console.log(res);
  return res;
};

const deleteFeatureAds = async data => {
  console.log(data);
  let res = await axios.post(`${url}/api/placead/deletefeatureads`, data);
  console.log(res);
  return res;
};
export {
  getAds,
  getAd,
  deleteAds,
  rejectAds,
  approveAds,
  activeAds,
  deActiveAds,
  emailSend,
  editAd,
  getFeatureAdsRequests,
  getFeatureAds,
  makeFeatureAd,
  removeFeatureAd,
  countAds,
  countFeatureAdsRequests,
  countFeatureAds,
  adsStats,
  deleteFeatureAds,
  getAdsApproval
};
