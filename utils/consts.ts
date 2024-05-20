const DASHBOARD: string = "/dashboard";
export const AUTH: string = "/auth";
const ORDERS: string = "/orders";

const NOTIFICATIONS: string = "/notifications";
const USERS: string = "/users";

export const AUTH_TOKEN: string = "AUTH_TOKEN";
export const ITEMS_X_PAGE = 5;
export const routes = {
  dashboard: DASHBOARD,
  auth: AUTH,
  login: `${AUTH}/login`,
  register: `${AUTH}/register`,
  forgotPassword: `${AUTH}/forgot-password`,
  verificationCode: `${AUTH}/verification-code`,
  orders: {
    index: `${ORDERS}`,
    pending: `${ORDERS}/pending`,
    completed: `${ORDERS}/completed`,
  },
  users: {
    drivers: `${USERS}/drivers`,
    customers: `${USERS}/customers`,
  },
  notifications:  NOTIFICATIONS,
};

export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16,
};

export const NAV = {
  WIDTH: 280,
};

export const SPACING = 8;
