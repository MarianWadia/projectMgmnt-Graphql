import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../queries/ProjectQueries"
import Spinner from "./Spinner"
import Card from "./Card"




export type Project = {
    id: string,
    status: string,
    description: string,
    name: string
}

const Projects = () => {
    const { data, loading, error } = useQuery(GET_PROJECTS)
  return (
    <div className='mx-8 md:mx-24 my-5'>
    <h3 className='text-3xl  font-thin'>All Projects</h3>
    {loading && (<Spinner />)}
    {error && (<p>error getting projects</p>)}
    {!error && !loading && (
        <div className=' grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-4 font-extralight '>
            {data.allProjects?.map((project: Project)=>(
               <Card project={project} key={project.id} />
            ))}
        </div>
    )}
</div>
  )
}

export default Projects