import AddClientButton from '../components/AddClientButton'

const AddButtons = () => {
  return (
    <div className='flex flex-row gap-6 md:mx-24 mx-10'>
        <AddClientButton forClient={true} />
        <AddClientButton forClient={false} />
    </div>
  )
}

export default AddButtons