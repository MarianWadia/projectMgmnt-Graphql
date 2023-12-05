import { useState } from "react"
import AddModal from "./AddModal"
import { FaUser } from "react-icons/fa"
import { FaList } from "react-icons/fa";


interface AddClientButtonProps {
    forClient: boolean;
  }
  
const AddClientButton : React.FC<AddClientButtonProps> = ({ forClient }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = ()=> {
        setIsModalOpen(true)
    }

    const closeModal = ()=> {
        setIsModalOpen(false)
    }

  return (
    <div>
        <div className="flex items-center">
            <button onClick={openModal} className={`text-lg text-white p-2 my-6 md:w-50 rounded-md flex items-center gap-4 justify-center ${forClient?`bg-violet-700 `:`bg-pink-700`}`}>
                {forClient?(
                    <>
                        <FaUser />
                        <span className="font-semibold text-xl">Add Client</span>
                    </>
                ):(
                    <>
                        <FaList />
                        <span className="font-semibold text-xl">Add Project</span>
                    </>
                )}
            </button>
        </div>
        <AddModal onClose={closeModal} isOpen={isModalOpen} forClient={forClient} />
    </div>  
  )
}

export default AddClientButton