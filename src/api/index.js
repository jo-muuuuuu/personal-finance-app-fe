import axios from "axios";
import { getToken } from "../utils/index.js";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.token = getToken();
  return config;
});

export default axiosInstance;
