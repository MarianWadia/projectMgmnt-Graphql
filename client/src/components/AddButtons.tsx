import AddClientButton from '../components/AddClientButton'

const AddButtons = () => {
  return (
    <div className='flex flex-row gap-4 mx-5 md:mx-24'>
        <AddClientButton forClient={true} />
        <AddClientButton forClient={false} />
    </div>
  )
}

export default AddButtons