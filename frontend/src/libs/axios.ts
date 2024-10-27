import Axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = Axios.create({
  headers: {
    'content-type': 'application/json',
  },
  timeout: 15000,
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (Axios.isAxiosError(error) && error.response) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        message: `Error ${error.response.status}: ${error.response.statusText}`,
      } as APIError);
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      message: 'An unexpected error occurred',
      error,
    } as APIError);
  },
);

export type APIError = {
  message: string;
};
