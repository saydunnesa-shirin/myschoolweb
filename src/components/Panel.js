// import classNames from 'classnames';

function Panel({ children, className, ...rest }) {
  // const finalClassNames = classNames(
  //   'border rounded p-3 shadow bg-white w-full',
  //   className
  // );

  return (

    <div className="mb-2 border rounded">
          <div className="flex p-2 justify-between items-center">
                    <div className='flex flex-row items-center justify-between'> 
                              {children}
                    </div>
                    
          </div>
   </div>

    // <div {...rest} className={finalClassNames}>
    //   {children}
    // </div>
  );
}

export default Panel;
