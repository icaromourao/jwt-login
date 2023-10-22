import AuthHelper from '@/helpers/AuthHelper';
import { createStore } from 'vuex';
import axios from '../plugins/axios';

export default createStore({
  state: {
    isRequesting: false,
    user: {},
  },
  getters: {
    getIsLogged() {
      return !AuthHelper.isAuthLocalStorageEmpty();
    },
    getIsRequesting(state) {
      return state.isRequesting;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setIsRequesting(state, isRequesting) {
      state.isRequesting = isRequesting;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    loginAction({ commit }, payload) {
      commit('setIsRequesting', true);

      return axios.get('auth/login', {
        params: {
          username: payload.username,
          password: payload.password,
          refreshTokenValidity: payload.remember ? 7 : 1,
        },
      }).then((loginRes) => {
        localStorage.setItem('access_token', loginRes.data.accessToken);
        localStorage.setItem('refresh_token', loginRes.data.refreshToken);
        localStorage.setItem('user_id', loginRes.data.userId);
      }).catch((error) => Promise.reject(error.response))
        .finally(() => {
          commit('setIsRequesting', false);
        });
    },
    logoutAction() {
      AuthHelper.logout();
    },
    getUserByIdAction(_, userId) {
      if (!Number.parseInt(userId, 10)) {
        throw new Error(`Parameter error. userId: ${userId}`);
      }

      return axios.get(`users/${userId}`, { needsAuth: true });
    },
    getUserByTokenAction() {
      return axios.get('users/bytoken', { needsAuth: true });
    },
  },
});
