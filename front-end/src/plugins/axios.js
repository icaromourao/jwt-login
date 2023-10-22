import axios from 'axios';
import AuthHelper from '@/helpers/AuthHelper';

const api = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

let numberOfRefreshAttempts = 0;

const tryGetAnewAccessToken = (error) => {
  const refreshToken = AuthHelper.getRefreshToken();
  const userId = AuthHelper.getUserId();

  if (refreshToken && userId) {
    numberOfRefreshAttempts += 1;
    return api.get('auth/token/refresh', {
      params: {
        userId,
        refreshToken,
      },
    }).then((res) => {
      numberOfRefreshAttempts = 0;
      const customConfig = error.config;

      localStorage.setItem('access_token', res.data.accessToken);
      customConfig.headers.Authorization = AuthHelper.getBearerToken();

      return axios({ ...customConfig });
    }).catch(() => {
      AuthHelper.logout();

      return Promise.reject(error);
    });
  }

  AuthHelper.logout();

  return Promise.reject(error);
};

api.interceptors.request.use(
  (config) => {
    const customConfig = config;

    if (customConfig.needsAuth) {
      customConfig.headers.Authorization = AuthHelper.getBearerToken();
    }

    return customConfig;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && numberOfRefreshAttempts === 0) {
      return tryGetAnewAccessToken(error);
    }

    AuthHelper.logout();

    return Promise.reject(error);
  },
);

export default api;
