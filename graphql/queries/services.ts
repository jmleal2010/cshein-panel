import { gql } from "@apollo/client";

export const LOAD_SERVICES_QUERY = gql`
  query Services {
  services {
    active
    description
    discount
    icon
    id
    name
    packageType
    priceBase
    priceExtra
    type
  }
}
`;

export const LOAD_SERVICE_QUERY = gql`
  query Service($serviceId: ID!) {
  service(id: $serviceId) {
    active
    description
    discount
    icon
    id
    name
    packageType
    priceBase
    priceExtra
    type
  }
}
`;
