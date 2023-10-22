export default {
  getRefreshToken() {
    return localStorage.getItem('refresh_token') || null;
  },
  getAccessToken() {
    return localStorage.getItem('access_token') || null;
  },
  getBearerToken() {
    return `Bearer ${this.getAccessToken()}`;
  },
  getUserId() {
    return localStorage.getItem('user_id') || null;
  },
  clearAuthLocalStorage() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
  },
  isAuthLocalStorageEmpty() {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const userId = localStorage.getItem('user_id');

    return !accessToken || !refreshToken || !userId;
  },
  logout() {
    if (!this.isAuthLocalStorageEmpty()) {
      this.clearAuthLocalStorage();
      window.location.replace('/login');
    }
  },
};
