import { FaTrash } from "react-icons/fa"
import { GET_PROJECTS } from "../queries/ProjectQueries"
import { DELETE_PROJECT } from "../mutations/projectMutations"
import { useMutation } from "@apollo/client"
import { Project } from "./Projects"
import { ProjectData } from "./AddModal"

interface ComponentProps {
    projectId: string
}

const DeleteProjectBtn: React.FC<ComponentProps> = ({ projectId }) => {
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: {id: projectId},
        update(cache, {data: { deleteProject }}){
          const allProjects  = cache.readQuery<ProjectData>({query: GET_PROJECTS})?.allProjects || []
          cache.writeQuery({
            query: GET_PROJECTS,
            data: {allProjects: allProjects.filter((project: Project)=>project.id !== deleteProject.id)}
          })
        }
      })
    
      const handleDeleteProject = ()=>{ 
        deleteProject()
        window.location.href = '/home'
      }
  return (
    <div className="ml-auto bg-red-600 p-2 w-60 rounded-lg text-center text-white flex items-center justify-center gap-5 text-lg hover:bg-red-800 transition-all">
        <FaTrash />
        <button onClick={handleDeleteProject}>Delete Project</button>
    </div>
  )
}

export default DeleteProjectBtn