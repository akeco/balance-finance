import ReactDOM from 'react-dom/client';
import App from '@/App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { YogaLink } from '@graphql-yoga/apollo-link';
import { split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.scss';

const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

const httpLink = new YogaLink({
  endpoint,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: endpoint.replace('http', 'ws'),
  }),
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
