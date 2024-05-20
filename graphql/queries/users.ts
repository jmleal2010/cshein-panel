import { gql } from "@apollo/client";

export const LOAD_USERS_QUERY = gql`
  query Query {
  adminListUsers {
    active
    email
    emailNotifications
    isEmailVerified
    isPhoneVerified
    lastName
    phone
    profilePicture
    smsNotifications
    createdAt
    firstName
    id
    pushNotifications
    whatsappNotifications
  }
}
`;

export const LOAD_USER_QUERY = gql`
  query adminOrder($orderId: ID!) {
    order(id: $orderId) {
      address {
        addressLine1
        addressLine2
        city
        country
        description
        id
        isDefault
        postalCode
        state
      }
      beneficiary {
        address
        email
        firstName
        id
        isDefault
        lastName
        phone
      }
      code
      createdAt
      packages {
        code
        content
        id
        isFragile
        orderId
        size
        type
        weight
      }
      id
      serviceType
      status
      updatedAt
      user {
        email
        firstName
        id
        lastName
        phone
        profilePicture
      }
      deliveryOrder {
        code
        status
        updatedAt
        packageType
        id
        order {
          id
        }
        createdAt
      }
      pickupOrder {
        code
        createdAt
        packageType
        status
        updatedAt
      }
    }
  }
`;
