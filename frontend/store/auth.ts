import {login} from '~/services/authService';

interface User {
  id: number;
  username: string;
  // Add other user properties as needed
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
}

const isClient = typeof window !== 'undefined'; // Check if running on the client-side

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isLoggedIn: isClient ? localStorage.getItem('isLoggedIn') === 'true' : false,
    token: isClient ? localStorage.getItem('authToken') || null : null,
    user: isClient ? JSON.parse(localStorage.getItem('user') || 'null') : null,
  }),
  getters: {
    isAuthenticated(state): boolean {
      return state.isLoggedIn;
    },
    currentUser(state): User | null {
      return state.user;
    },
  },
  actions: {
    async login(username: string, password: string, twofactor: string) {
      try {
        const jwtToken = await login(username, password, twofactor);
        this.SET_TOKEN(jwtToken.token);
        this.SET_LOGGED_IN(true);
        if (isClient) {
          localStorage.setItem('authToken', jwtToken.token);
          localStorage.setItem('isLoggedIn', 'true');
        }
        // Optionally, you can also fetch user data and set it in state
        // const user = await fetchUserData();
        // this.SET_USER(user);
        return jwtToken;
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    logout() {
      this.SET_TOKEN(null);
      this.SET_USER(null);
      this.SET_LOGGED_IN(false);
      if (isClient) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
      }
    },
    SET_TOKEN(token: string | null) {
      this.token = token;
    },
    SET_USER(user: User | null) {
      this.user = user;
      if (isClient) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    SET_LOGGED_IN(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;
      if (isClient) {
        localStorage.setItem('isLoggedIn', String(isLoggedIn));
      }
    },
  },
});