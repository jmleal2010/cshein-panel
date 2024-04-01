import {ApolloClient, InMemoryCache} from "@apollo/client";

/*
const client = new ApolloClient({
    uri: 'https://www.cubashein.com/graphql',
    cache: new InMemoryCache(),
});

export default client;
*/


export function createApolloClient() {
    return new ApolloClient({
        uri: 'https://www.cubashein.com/graphql',
        cache: new InMemoryCache(),
    });
}

let apolloClient;

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // Si el estado inicial se proporciona, restaura la caché del cliente
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    // Para SSG y SSR siempre crea un nuevo cliente
    if (typeof window === 'undefined') return _apolloClient;

    // Crea el cliente una vez en el cliente
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState) {
    return initializeApollo(initialState);
}
