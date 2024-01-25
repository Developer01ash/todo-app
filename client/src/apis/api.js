import axios from "axios";

// import { TOKEN } from "@/libs/constants";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000000,
});

// Change request data/error here
Axios.interceptors.request.use((config) => {
  const token = Cookies.get("session-tid");
  config.headers = {
    ...config.headers,
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Change response data/error here
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errMsg = "Something went wrong plz try again later";
    if (
      (error?.response && error?.response?.status === 401) ||
      (error?.response && error?.response?.status === 403)
    ) {
    }
    if (!error.message) error.message = errMsg;
    return Promise.reject(error);
  }
);

export class HttpClient {
  static token = "";

  static async get(url, params) {
    const response = await Axios.get(url, {
      ...params,
      headers: this.getHeaders(),
    });
    return response.data;
  }

  static async post(url, data) {
    const response = await Axios.post(url, data);
    return response.data;
  }

  static async postWithHeaders(url, data) {
    const response = await Axios.post(url, data, {
      headers: this.getHeaders(),
    });
    return response.data;
  }

  static async put(url, data) {
    const response = await Axios.put(url, data);
    return response.data;
  }

  static async patch(url, data, val) {
    const response = await Axios.patch(url, data, val);
    return response.data;
  }

  static async delete(url) {
    const response = await Axios.delete(url);
    return response.data;
  }

  static getHeaders = () => {
    return {
      Authorization: `Bearer ${this.token}`,
      "Cache-Control": "no-cache",
    };
  };
}
