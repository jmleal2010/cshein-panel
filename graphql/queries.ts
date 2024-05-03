import { gql } from "@apollo/client";

export const LOAD_ORDERS_QUERY = gql`
  query Orders($input: OrderQueryInput) {
    orders(input: $input) {
      edges {
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
  query Orders($orderId: ID!) {
    order(id: $orderId) {
      arrivalAt
      beneficiary {
        email
        fullName
        id
        phone
      }
      code
      createdAt
      deliveryAt
      deliveryFee
      deliveryFeeStatus
      id
      stage
      status
      total
      updatedAt
      userId
      qvapayInvoices {
        amount
        createdAt
        id
        orderId
        qvapayId
        status
        updatedAt
        url
      }
      orderItems {
        quantity
        product {
          id
          name
          skucode
          categoryId
          size
          color
          price
          discount
          link
          image
        }
      }
    }
  }
`;
