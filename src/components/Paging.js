import React from 'react';
import { GoTriangleLeft , GoTriangleRight } from 'react-icons/go';

const Paging = ({currentPage, pages, navigatePrev, navigateNext, handleCurrentPage, handleChangeDataPerpage}) => {


  return (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Records per page</span>
                <select className="ml-2 border"
                    onChange={(event) => {
                              handleChangeDataPerpage(event.target.value);
                            }}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a onClick={navigatePrev}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <GoTriangleLeft className="h-5 w-5" aria-hidden="true" />
                </a>
                {pages.map((_p) => (
                    <a key={_p} onClick={() => handleCurrentPage.call(null, _p)}
                      aria-current="page"
                      className= {_p === currentPage ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :
                      "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }
                    >
                      {_p}
                    </a>
                ))}
                <a onClick={navigateNext}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <GoTriangleRight  className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
  )
}

export default Paging;
