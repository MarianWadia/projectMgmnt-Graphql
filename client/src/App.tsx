import AddClientButton from "./components/AddClientButton"
import Clients from "./components/Clients"
import Header from "./components/Header"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client" 


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields:{
        allClients: {
          merge(existing, incoming){
            return incoming
          }
        },
        allProjects: {
          merge(existing, incoming){
            return incoming
          }
        },
      }
    }
  }
})

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache
})

function App() {
  return (
    <ApolloProvider client={client} >
      <Header />
      <AddClientButton />
      <Clients />
    </ApolloProvider>
  )
}

export default App
