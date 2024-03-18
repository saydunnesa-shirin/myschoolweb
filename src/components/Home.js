import React from 'react';
import {useSelector} from "react-redux";
import { GoSync } from 'react-icons/go';

import Message from "./Message";
import { ERROR } from '../helpers/constants';

const Home = () => {
  const isLoading = useSelector((state) => state.settings.isLoading);
  const error = useSelector((state) => state.settings.error);

  let content = <div>
    { isLoading && <GoSync className='animate-spin'></GoSync>}
  </div>


  return (
    <div>
      {error &&  <div> <Message message={'Error fetching data'} type={ERROR}></Message>  </div>}
    
      <div className="flex items-center justify-center opacity-80 text-9xl">
        <div className='border shadow'>
          {content}
        </div>
      </div>
    </div>
    
  )
}

export default Home;
