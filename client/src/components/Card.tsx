import { FaTrash } from "react-icons/fa"
import { Client } from "./Clients"
import { useMutation } from "@apollo/client"
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from "../queries/clientQueries"
import { Project } from "./Projects"
import { Link } from "react-router-dom"

interface ComponentProps {
    client?: Client;
    project?:  Project

}

const Card: React.FC<ComponentProps> = ({client, project}) => {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client?.id},
        update(cache, {data: {deleteClient} }){
            const { allClients } = cache.readQuery<Client[]>({query: GET_CLIENTS})
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { allClients: allClients.filter((client: Client)=>client.id !== deleteClient.id)}
            })
        }
    })

    const handleDeleteClient = () =>{
        deleteClient()
    }

  return (
    <div className={`
            ${client&&`bg-indigo-200 p-3 rounded-md flex flex-col gap-2 text-md text-black hover:cursor-pointer transition-all`} 
            ${project&&`bg-white border-2 border-lightgray p-3 rounded-md flex flex-col gap-2 text-md text-black hover:cursor-pointer transition-all`}`
    }>
    {client ? ( 
        <>
            <p>Name: {client?.name}</p>
            <p>Phone: {client?.phone}</p>
            <p>Email: {client?.email}</p>
            <button className='
                        self-end 
                        bg-red-600 
                        text-white 
                        p-2 
                        rounded-md 
                        hover:cursor-pointer 
                        hover:bg-red-800
                        transition-all'
                        onClick={handleDeleteClient} 
            >
                <FaTrash />
            </button>
        </>
    ) : (
        <>
            
            <div className="flex items-center justify-between">
                <p className="font-semibold text-2xl">{project?.name}</p>
                <Link to={`/projects/${project?.id}`} className='
                            self-end 
                            bg-gray-100 
                            text-black 
                            font-semibold
                            p-3 
                            rounded-md 
                            hover:cursor-pointer 
                            hover:bg-slate-300
                            transition-all'
                >
                    View
                </Link>
            </div>
            <p>
                Status: 
                <span className="font-semibold"> {project?.status}</span>
            </p>
        </>
    ) }
   

</div>
  )
}

export default Card