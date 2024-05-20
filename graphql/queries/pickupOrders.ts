import { gql } from "@apollo/client";

export const LOAD_PICKUP_ORDERS_QUERY = gql`
 query PickupOrders($input: PickupOrderQueryInput) {
  pickupOrders(input: $input) {
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
    code
    createdAt
    id
    order {
      id
    }
    packageType
    status
  }
}
`;

export const LOAD_PICKUP_ORDER_QUERY = gql`
query PickupOrder($input: PickupOrderQueryInput!) {
 pickupOrder(input: $input) {
    address {
      addressLine1
      addressLine2
      country
      description
      isDefault
      id
      postalCode
      state
    }
    code
    createdAt
    id
    status
    updatedAt
  }
}
`;
