import { useState } from 'react';
import { Bars3Icon, BellIcon, XMarkIcon  } from '@heroicons/react/24/outline';

import Link from './Link';
import SchoolImg from '../dist/images/school.jpg';

function Menubar() {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUserProfile, setIsOpenUserProfile] = useState(false);

  const userProfileLinks = [
    { label: 'Your Profile', path: '/user' },
    { label: 'Settings', path: '/settings' },
    { label: 'Sign out', path: '/login' },
  ];

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Institutions', path: '/institutions' },
    { label: 'Countries', path: '/countries' },
    { label: 'Employees', path: '/employees' },
    { label: 'Session Templates', path: '/academicSessionTemplates' },
    { label: 'Sessions', path: '/academicSessions' }
  ];

  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label}
        to={link.path}
        className="rounded-md px-3 py-2 text-sm font-medium"
        inactiveClassName="text-gray-300 hover:bg-gray-700 hover:text-white"
        activeClassName="font-bold bg-gray-900 text-white">
        {link.label}
      </Link>
     );
  });

  const mobileMenu = <div className="sm:hidden">
    <div onClick={() => setIsOpen(false)} className="space-y-1 px-2 pb-3 pt-2">
      {
        links.map((link) => {
          return (
            <Link
              key={link.label}
              to={link.path}
              className="block rounded-md px-3 py-2 text-base font-medium"
              inactiveClassName="text-gray-300 hover:bg-gray-700 hover:text-white"
              activeClassName="bg-gray-900 text-white">
              {link.label}
            </Link>
            );
        })
      }
    </div>
  </div>

  const userProfile = <div>
    <div onClick={() => setIsOpenUserProfile(!isOpenUserProfile)} className="fixed inset-0 bg-gray-300 opacity-80"></div>
    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {
            userProfileLinks.map((link) => {
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  inactiveClassName="block px-4 py-2 text-sm text-gray-700"
                  activeClassName="bg-gray-100">
                  {link.label}
                </Link>
              );
            })
          }
    </div>
  </div>

  return (
    <nav className="bg-gray-800">
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                 onClick={() => setIsOpen(!isOpen)}>
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src={SchoolImg} alt="Your Company"></img>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {renderedLinks}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* User Profile dropdown */}
                <div className="relative ml-3">
                  <button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                   onClick={() => setIsOpenUserProfile(!isOpenUserProfile)}>
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user profile</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                  { isOpenUserProfile && userProfile }
                </div>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          {isOpen &&  mobileMenu}
        </>
    </nav>
  );
}

export default Menubar;
