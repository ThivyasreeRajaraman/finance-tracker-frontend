import axios, { AxiosInstance } from 'axios';

const apiClient = (token: string | null): AxiosInstance => {
  const headers = token ? { Authorization: token } : {};

  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      common: headers
    }
  });
};

export default apiClient;
