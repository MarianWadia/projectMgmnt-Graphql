import React from 'react'
import { BsFilePersonFill } from 'react-icons/bs'
import { FaPhone } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Client } from './Clients'

interface componentProps {
    client: Client
}

const ClientInformation: React.FC<componentProps> = ({client}) => {
  return (
    <div className="mt-20">
              <h3 className="text-2xl">Client Information</h3>
              <div className="mx-2 my-4 border-2 border-gray-300 rounded-lg">
                <div className="p-2 flex flex-row items-center gap-2 text-lg">
                  <BsFilePersonFill />
                  <p>{client?.name}</p>
                </div>
                <hr />

                <div className="p-2 flex flex-row items-center gap-2 text-lg">
                  <MdEmail />
                  <p>{client?.email}</p>
                </div>
                <hr />

                <div className="p-2 flex flex-row items-center gap-2 text-lg">
                  <FaPhone />
                  <p>{client?.phone}</p>
                </div>

              </div>
           </div>

  )
}

export default ClientInformation