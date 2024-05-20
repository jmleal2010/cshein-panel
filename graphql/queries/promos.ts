import { gql } from "@apollo/client";

export const LOAD_PROMOS_QUERY = gql`
  query Promos($input: PromoQueryInput) {
  promos(input: $input) {
    active
    calltoAction
    code
    description
    createdAt
    discount
    endDate
    image
    textColor
    title
    updatedAt
    id
  }
}
`;

export const LOAD_PROMO_QUERY = gql`
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
