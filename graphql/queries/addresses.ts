import { gql } from "@apollo/client";

export const LOAD_ADDRESSES_QUERY = gql`
 query Addresses {
  addresses {
    addressLine1
    city
    country
    description
    id
    isDefault
    postalCode
    state
  }
}
`;

export const LOAD_ADDRESS_QUERY = gql`
 query Address($input: AddressQueryInput!) {
  address(input: $input) {
    addressLine1
    addressLine2
    city
    country
    description
    isDefault
    id
    postalCode
    state
    userId
  }
}
`;
