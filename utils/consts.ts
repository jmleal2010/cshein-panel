import { StatusType } from "@/interfaces";
import { dir } from "console";
import { pick } from "lodash";

const DASHBOARD: string = "/dashboard";
const ORDERS: string = "/orders";
const NOTIFICATIONS: string = "/notifications";
const USERS: string = "/users";
const TOOLS: string = "/tools";
const BENEFICIARIES: string = "/beneficiaries";

export const AUTH: string = "/auth";
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
    index: `${USERS}`,
  },
  tools: {
    index: `${TOOLS}`,
    services: `${TOOLS}/services`,
    dimensions: `${TOOLS}/dimensions`,
    promos: `${TOOLS}/promos`,
    offers: `${TOOLS}/offers`,
  },
  notifications: NOTIFICATIONS,
  beneficiaries: {
    index: `${BENEFICIARIES}`,
    addresses: `${BENEFICIARIES}/addresses`,
    pickUpPoints: `${BENEFICIARIES}/pickup-orders`,
  },
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
export const statusTypes: StatusType[] = [
  {
    label: "ACCEPTED",
    value: "ACCEPTED",
  },
  {
    label: "PENDING",
    value: "PENDING",
  },
  {
    label: "OUT FOR DELIVERY",
    value: "OUT_FOR_DELIVERY",
  },
  {
    label: "PICKED UP",
    value: "PICKED_UP",
  },
  {
    label: "DELIVERED",
    value: "DELIVERED",
  },
  {
    label: "CANCELLED",
    value: "CANCELLED",
  },
  {
    label: "IN PROGRESS",
    value: "IN_PROGRESS",
  },
];
