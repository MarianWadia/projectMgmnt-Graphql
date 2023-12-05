import AddButton from './AddButton'

const AddButtons = () => {
  return (
    <div className='flex flex-row gap-4 justify-center md:mx-24 md:justify-start'>
        <AddButton forClient={true} />
        <AddButton forClient={false} />
    </div>
  )
}

export default AddButtons