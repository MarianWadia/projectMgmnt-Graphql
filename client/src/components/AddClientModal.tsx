import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react"
import { MdClose } from "react-icons/md";
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from "../queries/clientQueries";
import { Client } from "./Clients";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/ProjectQueries";


interface ComponentProps {
    isOpen: boolean;
    onClose: () => void;
    forClient: boolean
}

const AddClientModal : React.FC<ComponentProps> = ({isOpen, onClose, forClient}) => {
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const [projectName, setProjectName] = useState('')
    const [desc, setDesc] = useState('')
    const [status, setStatus] = useState('new')
    const [clientId, setClientId] = useState('')


    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {name, email, phone},
        update(cache, {data: { addClient } }){
            const { allClients } = cache.readQuery({query: GET_CLIENTS})
            cache.writeQuery({
                query: GET_CLIENTS, 
                data: {allClients: [...allClients, addClient]}
            })
        }
    })

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: {name: projectName, description: desc, status, clientId},
        update(cache, {data: { addProject } }){
            const { allProjects } = cache.readQuery({query: GET_PROJECTS})
            cache.writeQuery({
                query: GET_PROJECTS, 
                data: {allProjects: [...allProjects, addProject]}
            })
        }
    })

    const {data, loading, error } = useQuery(GET_CLIENTS)

    const handleClientSave = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(email === '' || name === '' || phone === ''){
            return alert('Please fill in all the required fields ⚠')
        }
        addClient({
            variables: {name, email, phone}
        })
        setName('')
        setEmail('')
        setPhone('')
        onClose()
    }

    const handleProjectSave = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(desc, projectName, status)
        if(projectName ==='' || desc === '' || status === '' || clientId === ''){
            return alert('Please fill in all the required fields ⚠')
        }
        addProject({
            variables: {name: projectName, description: desc, status, clientId}
        })
        setProjectName('')
        setDesc('')
        setStatus('new')
        setClientId('')
        onClose()
    }
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 flex justify-center items-center">
            <div className='bg-white p-4 w-80 md:w-1/3 rounded-lg shadow-md'> 
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4">{forClient? 'Add Client' : 'Add Project'}</h2>
                    <button onClick={onClose} className="text-xl">
                        <MdClose />
                    </button>
                </div>
                <form onSubmit={forClient?handleClientSave: handleProjectSave}>
                   {forClient ? (
                    <>
                        <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            required 
                            id="clientName" 
                            type="text" 
                            placeholder="Enter your name" 
                            value={name} 
                            onChange={(e)=>setName(e.target.value)} 
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none focus:border-gray-600"
                        />
                        <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            required 
                            id="clientEmail" 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)} 
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none focus:border-gray-600"
                        />
                        <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            required 
                            id="clientPhone" 
                            type="tel" 
                            placeholder="Enter your phone" 
                            value={phone} 
                            onChange={(e)=>setPhone(e.target.value)} 
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none focus:border-gray-600"
                        />
                    </>
                   ): (
                        <>
                            {error&&(<p>Something went wrong...</p>)}
                            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
                            <input
                                required 
                                id="projectName" 
                                type="text" 
                                placeholder="Enter project Name" 
                                value={projectName} 
                                onChange={(e)=>setProjectName(e.target.value)} 
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none focus:border-gray-600"
                            />
                            <label htmlFor="projectDesc" className="block text-sm font-medium text-gray-700 mt-4">Description</label>
                            <textarea
                                required 
                                id="projectDesc" 
                                rows={3}
                                placeholder="Enter Project Description" 
                                value={desc} 
                                onChange={(e)=>setDesc(e.target.value)} 
                                className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none focus:border-gray-600"
                            />

                            <label htmlFor="projectDesc" className="block text-sm font-medium text-gray-700 mt-4">Status</label>
                            <select id="status" value={status} onChange={(e)=>setStatus(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none focus:border-gray-600">
                                <option value="new">Not Started</option>
                                <option value="progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>

                            <label htmlFor="projectDesc" className="block text-sm font-medium text-gray-700 mt-4">Client</label>
                            <select id="clientId" value={clientId} onChange={(e)=>setClientId(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full outline-none focus:border-gray-600">
                                <option value="">Select Client</option>
                                {!error && !loading && data?.allClients?.map((client: Client)=>(
                                    <option value={client.id} key={client.id}>{client.name}</option>
                                ))}
                            </select>
                        </>
                   )}

                    <div className="mt-4 flex justify-end">
                        <button
                        className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-800 transition-all"
                        type="submit"
                        >
                        Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddClientModal