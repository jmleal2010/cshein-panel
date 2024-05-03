import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";
import { AUTH_TOKEN } from "@/utils/consts";

const httpLink = new HttpLink({
  uri: "https://competent-meta-conexen.koyeb.app/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const cookiesStore = cookies();

  const token = cookiesStore.get(AUTH_TOKEN).value;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
    connectToDevTools: true,
  });
});
