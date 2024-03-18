import React from 'react';
import { useEffect  } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SUCCESS, ERROR } from '../helpers/constants';

const Message = ({message, type}) => {
          
let props = {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light"};

useEffect(() => { 
  if(type === SUCCESS)
    toast.success(message, { props }); 
  else if (type === ERROR)
    toast.error(message, { props }); 
  else
    toast(message, { props }); 
}, [message]);
        
  return (
    <div>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="light"
          />
      <ToastContainer />
    </div>
  )
}

export default Message
