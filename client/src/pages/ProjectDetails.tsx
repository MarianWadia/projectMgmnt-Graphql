import { useMutation, useQuery } from "@apollo/client"
import { GET_PROJECT, GET_PROJECTS } from "../queries/ProjectQueries"
import Spinner from "../components/Spinner"
import { Link, useParams } from "react-router-dom"
import { BsFilePersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { DELETE_PROJECT, UPDATE_PROJECT } from "../mutations/projectMutations";
import { Project } from "../components/Projects";




const ProjectDetails = () => {
  const { projectId } = useParams()
  console.log(projectId);
  
  const { data, loading, error } = useQuery(GET_PROJECT,{
    variables: {id: projectId}
  })
  const project = data?.project
  const [projectName, setProjectName] = useState(project?.name)
  const [desc, setDesc] = useState(project?.description)
  const [status, setStatus] = useState(project?.status)
  


  console.log(project)
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {id: projectId},
    update(cache, {data: { deleteProject }}){
      const { allProjects } = cache.readQuery({query: GET_PROJECTS})
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {allProjects: allProjects.filter((project: Project)=>project.id !== deleteProject.id)}
      })
    }
  })


  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {id: projectId, name: projectName, description: desc, status},
    refetchQueries: [{query: GET_PROJECT, variables: {id: projectId}}]
  })

  const handleDeleteProject = ()=>{
    deleteProject()
    window.location.href = '/home'
  }

  const handleUpdateProject = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(projectName ==='' || desc === '' || status === ''){
      return alert('Please fill in all the required fields ⚠')
    }
    updateProject({
      variables: {id: projectId, name: projectName, description: desc, status}
    })
  }
  
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

           <div className="mt-20">
              <h3 className="text-2xl">Client Information</h3>
              <div className="mx-2 my-4 border-2 border-gray-300 rounded-lg">
                <div className="p-2 flex flex-row items-center gap-2 text-lg">
                  <BsFilePersonFill />
                  <p>{project?.client.name}</p>
                </div>
                <hr />

                <div className="p-2 flex flex-row items-center gap-2 text-lg">
                  <MdEmail />
                  <p>{project?.client.email}</p>
                </div>
                <hr />

                <div className="p-2 flex flex-row items-center gap-2 text-lg">
                  <FaPhone />
                  <p>{project?.client.phone}</p>
                </div>

              </div>
           </div>

           <div className="mt-20">
              <h3 className="text-3xl font-semibold">Update Project Details</h3>
              <form onSubmit={handleUpdateProject} className="mx-2 my-4">
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input 
                      id="projectName" 
                      type="text"   
                      value={projectName} 
                      onChange={(e)=>setProjectName(e.target.value)} 
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none focus:border-gray-600"
                  />
                  <label htmlFor="projectDesc" className="block text-sm font-medium text-gray-700 mt-4">Description</label>
                  <textarea 
                      id="projectDesc" 
                      rows={3}  
                      value={desc} 
                      onChange={(e)=>setDesc(e.target.value)} 
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none focus:border-gray-600"
                  />

                   <label htmlFor="status" className="block text-sm font-medium text-gray-700 mt-4">Status</label>
                    <select id="status" onChange={(e)=>setStatus(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none focus:border-gray-600">
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                  <div className="mt-4">
                      <button
                      className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-800 transition-all"
                      type="submit"
                      >
                      Submit
                      </button>
                  </div>
              </form>
            </div>
          <div className="ml-auto bg-red-600 p-2 w-60 rounded-lg text-center text-white flex items-center justify-center gap-5 text-lg hover:bg-red-800 transition-all">
            <FaTrash />
            <button onClick={handleDeleteProject}>Delete Project</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetails