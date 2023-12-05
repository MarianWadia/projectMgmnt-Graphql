import Clients from '../components/Clients'
import Projects from '../components/Projects'
import AddButtons from '../components/AddButtons'

const Home = () => {
  return (
    <div>
        <AddButtons />
        <Projects />
        <Clients />
    </div>
  )
}

export default Home