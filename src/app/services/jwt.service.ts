import { isBrowser } from '@/utils/browser.util';

const ACCESS_TOKEN_KEY = 'access-token' as string;
const REFRESH_TOKEN_KEY = 'refresh-token' as string;

/**
 * @description get token form localStorage
 */
export const getAccessToken = (): string | null => {
  if (!isBrowser()) {
    return null;
  }

  const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!accessToken) {
    return null;
  }
  return accessToken;
};

/**
 * @description get token form localStorage
 */
export const getRefreshToken = (): string | null => {
  if (!isBrowser()) {
    return null;
  }

  return window.localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * @description save token into localStorage
 * @param data
 */
export const saveTokens = (data: { access_token: string; refresh_token?: string }): void => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
  if (data.refresh_token) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
  }
};

/**
 * @description remove token form localStorage
 */
export const destroyTokens = (): void => {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export default { getAccessToken, getRefreshToken, saveTokens, destroyTokens };
