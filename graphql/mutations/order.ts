import { gql } from "@apollo/client";

export const UPDATE_ORDER_MUTATION = gql`
mutation UpdateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
        id
        code
        createdAt
        updatedAt
        status
        serviceType
        transactionId
        user {
        email
        firstName
        }
        beneficiary {
        firstName
        lastName
        email
        phone
        address
        }
        address {
        addressLine1
        addressLine2
        city
        state
        postalCode
        country
        description
        }
        packages {
        code
        content
        weight
        length
        width
        height
        }
    }
    }
  `



export const ADMIN_UPDATE_ORDER_MUTATION = gql`
    mutation adminUpdateOrder($input: AdminUpdateOrderInput!) {
    adminUpdateOrder(input: $input) {
        status
    }
}`