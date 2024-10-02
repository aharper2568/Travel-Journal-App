import decode from 'jwt-decode';

class AuthService {
  /** Retrieves user details.  */
  getProfile() {
    return decode(this.getToken());
  }

  /** Returns boolean value to determine if user is logged in. */
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  /**
   * Returns boolean value to determine if the token is experired.
   * If the token is expired, it will also be removed from localStorage.
  */
  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < (Date.now() / 1000)) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  /** Retrieves token from localStorage. */
  getToken() {
    return localStorage.getItem('id_token');
  }

  /**
   * Sets token as id_token in localStorage and
   * redirects logged in user to homepage.
  */
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  /**
   * Removes id_token token from localStorage and
   * reloads the page.
   */
  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
