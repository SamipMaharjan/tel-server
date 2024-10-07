const axios = require("axios");
const MY_TOKEN = process.env.BOT_TOKEN;

const BASE_URL = `https://api.telegram.org/bot7414092820:AAElgG1Lax888Yzzv3ME4LEtsAp_c_NuoCI`;

const Axios = axios.create({
  baseURL: BASE_URL,
});

// function getAxiosInstance() {
//   return {
//     get(method, params) {
//       return axios.get(`${BASE_URL}/${method}`, {
//         params,
//       });
//     },
//     post(method, params) {
//       return axios.post(`${BASE_URL}/${method}`, params);
//     },
//   };
// }

module.exports = { Axios, BASE_URL };
