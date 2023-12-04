import { FaTrash } from "react-icons/fa"
import { Client } from "./Clients"
import { useMutation } from "@apollo/client"
import { DELETE_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from "../queries/clientQueries"

interface ComponentProps {
    client: Client,
    index: number
}

const ClientCard: React.FC<ComponentProps> = ({client, index}) => {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id},
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
    <div className='bg-slate-300 p-3 rounded-md flex flex-col gap-2 text-md text-black hover:cursor-pointer transition-all'>
    <p className='text-center text-lg font-thin'>Client {index + 1}</p>
    <p>Name: {client.name}</p>
    <p>Phone: {client.phone}</p>
    <p>Email: {client.email}</p>
    <button onClick={handleDeleteClient} className='
            self-end 
            bg-red-600 
            text-white 
            p-2 
            rounded-md 
            hover:cursor-pointer 
            hover:bg-red-800
            transition-all'
    >
        <FaTrash />
    </button>

</div>
  )
}

export default ClientCard