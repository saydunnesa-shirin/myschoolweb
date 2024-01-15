import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import classNames from 'classnames';
import { MODAL_SIZE_LARGE, MODAL_SIZE_MEDIUM } from '../constants';

function Modal({ onClose, children, actionBar, size }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const classes = classNames(
          'fixed bg-white p-10 rounded-md shadow-md',
          size === MODAL_SIZE_LARGE && 'inset-20',
          size === MODAL_SIZE_MEDIUM && 'inset-40'
  );

  return ReactDOM.createPortal(
    <div className='w-screen h-screen bg-black bg-opacity-30 fixed top-0 right-0 flex justify-center items-center'>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80"
      ></div>
      <div className={classes}>
        <div className='flex flex-col justify-between h-full'>
          {children}
          <div>{actionBar}</div>
        </div>
      </div>
    </div>,
    document.querySelector('.modal-container')
  );
}

export default Modal;
