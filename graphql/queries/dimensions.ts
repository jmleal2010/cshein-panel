import { gql } from "@apollo/client";

export const LOAD_DIMENSIONS_QUERY = gql`
  query Dimensions {
  dimensions {
    active
    description
    id
    name
    size
    pricePerLb
  }
}
`;

export const LOAD_DIMENSION_QUERY = gql`
  query Dimension($dimensionId: ID!) {
  dimension(id: $dimensionId) {
    active
    description
    id
    name
    pricePerLb
    size
  }
}
`;
