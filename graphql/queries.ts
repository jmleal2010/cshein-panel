import { gql } from "@apollo/client";

export const LOAD_ORDERS_QUERY = gql`
  query Orders($input: OrderQueryInput) {
    orders(input: $input) {
      edges {
        id
        addressId
        code
        createdAt
        serviceType
        status
        transactionId
        updatedAt
        beneficiary {
          firstName
          lastName
        }
      }
      pageInfo {
        currentPage
        hasNextPage
        totalPages
      }
    }
  }
`;

export const LOAD_ORDER_QUERY = gql`
  query Order($orderId: ID!) {
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
    }
  }
`;
