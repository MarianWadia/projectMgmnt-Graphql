import { useState } from "react"
import AddClientModal from "./AddClientModal"
import { FaUser } from "react-icons/fa"

const AddClientButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = ()=> {
        setIsModalOpen(true)
    }

    const closeModal = ()=> {
        setIsModalOpen(false)
    }

  return (
    <div>
        <div className="flex items-center md:mx-24 mx-10">
            <button onClick={openModal} className="bg-violet-700 text-lg text-white p-2 my-6 w-60 rounded-md flex items-center gap-4 justify-center">
                <FaUser />
                <span className="font-semibold text-xl">Add Client</span>
            </button>
        </div>
        <AddClientModal onClose={closeModal} isOpen={isModalOpen} />
    </div>
  )
}

export default AddClientButton