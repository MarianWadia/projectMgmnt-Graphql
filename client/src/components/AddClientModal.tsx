import { useMutation } from "@apollo/client";
import { useState } from "react"
import { MdClose } from "react-icons/md";
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from "../queries/clientQueries";


interface ComponentProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddClientModal : React.FC<ComponentProps> = ({isOpen, onClose}) => {
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {name, email, phone},
        update(cache, {data: { addClient } }){
            const { allClients } : null= cache.readQuery({query: GET_CLIENTS})
            cache.writeQuery({
                query: GET_CLIENTS, 
                data: {allClients: [...allClients, addClient]}
            })
        }
    })

    const handleSave = (e:React.FormEvent<HTMLFormElement>) =>{
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
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 flex justify-center items-center">
            <div className='bg-white p-4 w-80 md:w-1/3 rounded-lg shadow-md'> 
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold mb-4">Add Client</h2>
                    <button onClick={onClose} className="text-xl">
                        <MdClose />
                    </button>
                </div>
                <form onSubmit={handleSave}>
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