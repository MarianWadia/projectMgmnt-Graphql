import React, { useState } from 'react'
import { Project } from './Projects'
import { GET_PROJECT } from '../queries/ProjectQueries'
import { UPDATE_PROJECT } from '../mutations/projectMutations'
import { useMutation } from '@apollo/client'

interface ComponentProps {
    project: Project
}

const UpdateProject: React.FC<ComponentProps> = ({project}) => {
    const [projectName, setProjectName] = useState(project.name)
    const [desc, setDesc] = useState(project.description)
    const [status, setStatus] = useState(()=>{
        switch (project.status) {
            case "Not Started":
              return "new";
            case "In Progress":
              return "progress";
            case "Completed":
              return "completed";
            default:
              throw new Error(`Unknown status: ${project.status}`);
          }
    })

    const originalStatus = () => {
        switch (project.status) {
            case "Not Started":
              return "new";
            case "In Progress":
              return "progress";
            case "Completed":
              return "completed";
            default:
              throw new Error(`Unknown status: ${project.status}`);
          }
     }

    
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {id: project.id, name: projectName, description: desc, status},
    refetchQueries: [{query: GET_PROJECT, variables: {id: project.id}}]
  })

  const handleUpdateProject = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(projectName ==='' || desc === '' || status === ''){
      return alert('Please fill in all the required fields ⚠')
    }
    updateProject({
      variables: {id: project.id, name: projectName, description: desc, status}
    })
    window.location.href = '/home'
  }
  

  return (
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
                    <select id="status" value={status} onChange={(e)=>setStatus(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none focus:border-gray-600">
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                  <div className="mt-4">
                      <button
                        disabled={projectName===project.name && status===originalStatus() && desc === project.description}
                        className='bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-800 transition-all disabled:cursor-not-allowed disabled:bg-slate-400'
                        type="submit"
                      >
                      Submit
                      </button>
                  </div>
              </form>
            </div>
  )
}

export default UpdateProject