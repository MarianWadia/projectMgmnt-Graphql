import { useQuery } from '@apollo/client'
import { GET_CLIENTS } from '../queries/clientQueries'
import Spinner from './Spinner'
import Card from './Card'


export type Client = {
    id: string,
    name: string,
    phone: string,
    email: string,
}
const Clients = () => {
    const {error, data, loading} = useQuery(GET_CLIENTS)

   
  return (
    <div className='mx-8 md:mx-24 my-5'>
        <h3 className='text-3xl font-thin'>All Clients</h3>
        {loading && (<Spinner />)}
        {error && (<p>error getting clients</p>)}
        {!error && !loading && (
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 font-extralight '>
                {data.allClients?.map((client: Client)=>(
                   <Card client={client} key={client.id} />
                ))}
            </div>
        )}
    </div>
  )
}

export default Clients