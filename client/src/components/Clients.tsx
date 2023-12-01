import { gql, useQuery } from '@apollo/client'
import { FaTrash } from 'react-icons/fa'

const GET_CLIENTS = gql`
    query getClients {
        allClients{
            id,
            name,
            phone,
            email,
        }
    }
`
type Client = {
    id: string,
    name: string,
    phone: string,
    email: string,
}
const Clients = () => {
    const {error, data, loading} = useQuery(GET_CLIENTS)
    console.log(data)
  return (
    <div className='mx-8 md:mx-24 my-5'>
        <h3 className='text-xl font-thin'>All Clients</h3>
        {loading && (<p>loading...</p>)}
        {error && (<p>error getting clients</p>)}
        {!error && !loading && (
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 font-extralight'>
                {data.allClients?.map((client: Client, index:number)=>(
                    <div className='bg-gray-400 p-3 rounded-md flex flex-col gap-2 text-md text-black' key={client.id}>
                    <p className='text-center text-lg font-thin'>Client {index + 1}</p>
                    <p>Name: {client.name}</p>
                    <p>Phone: {client.phone}</p>
                    <p>Email: {client.email}</p>
                    <div className='
                            self-end 
                            bg-red-600 
                            text-white 
                            p-2 
                            rounded-md 
                            hover:cursor-pointer 
                            hover:bg-red-800'
                    >
                        <FaTrash />
                    </div>

                </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default Clients