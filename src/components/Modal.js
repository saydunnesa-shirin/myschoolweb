import React from 'react'
// import { IoWarning} from 'react-icons/io5';
import Button from './Button';

function Modal({entity, setPopUp, confirmDelete}) {
  return (
    <div className='w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex justify-center items-center'>
      <div className='bg-white p-10 rounded-md shadow-md'>
        <p>
          Are you sure you want to delete this <b>{entity}</b>?
          {/* <p className='bg-[#ffe9d9] p-2 border-l-2 border-[#fa703f] text-[#bc4c2e] flex flex-col text-sm my-1'>
            <span className='text-[#771505] font-bold flex items-center gap-1'>
              <IoWarning />
              Warning
            </span>
            By Deleting this {entity}, you won't be able to access the system.
          </p> */}
        </p>
        <div className='flex justify-between mt-5'>
          <Button secondary={true}
          onClick={() => setPopUp(false)}
          >No, Cancel</Button>
          <Button danger={true}
          onClick={confirmDelete}
          >Yes, Delete</Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
