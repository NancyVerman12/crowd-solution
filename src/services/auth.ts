import { STORAGE_KEYS } from '../config/api';

// Auth helper functions
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return !!token;
};

export const getAuthToken = (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const setAuthToken = (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const clearAuthToken = (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_EMAIL);
};

export const logout = (): void => {
    clearAuthToken();
    window.location.hash = 'login';
};

// Auth guard - redirect to login if not authenticated
export const requireAuth = (): boolean => {
    if (!isAuthenticated()) {
        window.location.hash = 'login';
        return false;
    }
    return true;
};

// Auth Service class for compatibility
export class AuthService {
    static setToken = setAuthToken;
    static getToken = getAuthToken;
    static clearToken = clearAuthToken;
    static isAuthenticated = isAuthenticated;
    static logout = logout;

    static setUserEmail(email: string): void {
        localStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
    }

    static getUserEmail(): string | null {
        return localStorage.getItem(STORAGE_KEYS.USER_EMAIL);
    }
}
