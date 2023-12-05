import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client" 
import Home from "./pages/Home"
import ProjectDetails from "./pages/ProjectDetails"
import NotFound from "./pages/NotFound"
import Header from "./components/Header"


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields:{
        allClients: {
          merge(incoming){
            return incoming
          }
        },
        allProjects: {
          merge(incoming){
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
     <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/home" Component={Home} />
        <Route path="/projects/:projectId" Component={ProjectDetails} />
        <Route path="*" Component={NotFound} />
      </Routes>
     </Router>
    </ApolloProvider>
  )
}

export default App
