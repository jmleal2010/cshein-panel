const DASHBOARD:string = '/dashboard';
export const AUTH:string = '/auth'
const ORDERS:string = '/orders'

export const AUTH_TOKEN:string = 'AUTH_TOKEN'

export const routes = {
    dashboard: DASHBOARD,
    auth: AUTH,
    login: `${AUTH}/login`,
    register: `${AUTH}/register`,
    forgotPassword: `${AUTH}/forgot-password`,
    verificationCode: `${AUTH}/verification-code`,
    orders: `${ORDERS}`
}
