import { useQuery } from "@apollo/client"
import { GET_PROJECT } from "../queries/ProjectQueries"
import Spinner from "../components/Spinner"
import { Link, useParams } from "react-router-dom"
import ClientInformation from "../components/ClientInformation";
import UpdateProject from "../components/Updateproject";
import DeleteProjectBtn from "../components/DeleteProjectBtn";




const ProjectDetails = () => {
  const { projectId } = useParams()  
  const { data, loading, error } = useQuery(GET_PROJECT,{
    variables: {id: projectId}
  })
  const project = data?.project

  return (
    <div className='mx-8 md:mx-24 my-5'> 
      {loading && (<Spinner />)}
      {error && (<p>error getting projects</p>)}
      {!loading && !error && data && (
        <div className="p-12 border-2 border-gray-300 rounded-md">
           <div className="ml-auto bg-gray-100 p-2 w-60 rounded-lg text-center">
            <Link to='/home'>Go Back</Link>
           </div>
           <div>
              <h2 className="text-3xl font-semibold">{project?.name}</h2>
              <h3 className="text-base text-gray-600 mt-4">{project?.description}</h3>
              <div className="mt-10">
                <h4 className="text-xl font-medium">Project Status</h4>
                <p className="text-lg font-light text-gray-500 mt-2">{project?.status}</p>
              </div>
           </div>

           <ClientInformation client={project?.client} />

           <UpdateProject project={project} />

          <DeleteProjectBtn projectId={projectId!} />
        </div>
      )}
    </div>
  )
}

export default ProjectDetails