import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './lib/apollo'
import { ItemList } from './components/ItemList'

export const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ItemList />
    </ApolloProvider>
  )
}