import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`mutation SignUpWithEmail($input: SignUpWithEmailInput!) {
  signUpWithEmail(input: $input) {
    active
    createdAt
    email
    firstName
    lastName
    password
    phone
    updatedAt
  }
}`

export const SEND_EMAIL_CONFIRMATION_MUTATION = gql`mutation SendEmailConfirmationCode($email: String!) {
  sendEmailConfirmationCode(email: $email) {
    code
  }
}`

export const  RESET_PASSWORD_MUTATION = gql`mutation ResetPassword($email: String!) {
  resetPassword(email: $email) {
    status
    success
  }
}`


export const VERIFICATION_CODE_MUTATION = gql`mutation VerifyEmailConfirmationCode($email: String!, $code: String!) {
  verifyEmailConfirmationCode(email: $email, code: $code) {
    token
  }
}`
