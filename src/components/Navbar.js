import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { FaWallet, FaUser } from "react-icons/fa";
import { MdFavorite, MdHelp, } from "react-icons/md";
import Link from './Link';
import SchoolImg from '../dist/images/school.jpg';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links = [
          { label: 'Home', path: '/' },
          { label: 'Institutions', path: '/institutions' },
          { label: 'Countries', path: '/countries' },
          { label: 'Employees', path: '/employees' },
          { label: 'Students', path: '/students' },
          { label: 'Session Templates', path: '/academicSessionTemplates' },
          { label: 'Sessions', path: '/academicSessions' },
          { label: 'Enrollments', path: '/enrollments' },
          { label: 'Enrollments Preview', path: '/enrollmentsPreview' },
        ];

  // const menuItems = [
  //   { icon: <TbTruckDelivery size={25} className="mr-4" />, text: "Orders" },
  //   { icon: <MdFavorite size={25} className="mr-4" />, text: "Favorites" },
  //   { icon: <FaWallet size={25} className="mr-4" />, text: "Wallet" },
  //   { icon: <MdHelp size={25} className="mr-4" />, text: "Help" },
  // ];

  const renderedLinks = links.map((link) => {
    return (
      <Link
        key={link.label}
        to={link.path}
        className="rounded-md px-3 py-3"
        inactiveClassName="text-gray-800 hover:bg-gray-700 hover:text-white"
        activeClassName="bg-blue-900 text-white">
        {link.label}
      </Link>
      );
  });

  return (
    <div className="bg-slate-200">
      <div className=" max-w-[1640px] mx-auto sm:flex sm:justify-between sm:items-center p-4 shadow-sm ">
          {/* Left side */}
          <div className="flex items-center">
            <div onClick={() => setNav(!nav)} className="cursor-pointer mr-2">
              <AiOutlineMenu size={30} />
            </div>
            <div className="flex justify-between">
              <img className="h-10 w-auto " src={SchoolImg} alt="Your Company"></img>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
                  School <span className="font-bold">Management</span>
              </h1>
            </div>
            
            {/* <div className="hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]">
              <p className="bg-black text-white rounded-full p-2">Delivery</p>
              <p className="p-2">Pickup</p>
            </div> */}
          </div>

          {/* Search Input */}
          <div className="border border-blue-900 bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
            <AiOutlineSearch size={25} />
            <input
              className="bg-transparent p-2 w-full focus:outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
          <button className="bg-black text-white hidden md:flex items-center py-2 rounded-full border border-black px-5">
            <FaUser size={20} className="mr-2" /> User
          </button>

          {/* Mobile Menu */}
          {/* Overlay */}
          {nav ? (
            <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0" onClick={() => setNav(!nav)}></div>
          ) : (
            ""
          )}

          {/* Side drawer menu */}
          <div
            className={
              nav
                ? "fixed top-0 left-0 w-[320px] h-screen bg-white z-10 duration-300 overflow-y-auto"
                : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
            }
          >
            <AiOutlineClose
              onClick={() => setNav(!nav)}
              size={30}
              className="absolute right-4 top-4 cursor-pointer"
            />
            <h2 className="text-2xl p-4">
              School <span className="font-bold">Management</span>
            </h2>
            <nav>
              <ul className="flex flex-col p-4 text-black" onClick={() => setNav(!nav)}>
                {/* {menuItems.map(({ icon, text }, index) => {
                  return (
                    <div key={index} className=" py-4">
                      <li className="text-xl flex cursor-pointer  w-[50%] rounded-full mx-auto p-2 hover:text-white hover:bg-black">
                        {icon} {text}
                      </li>
                    </div>
                  );
                })} */}
                {renderedLinks}
              </ul>
            </nav>
          </div>
        </div>
    </div>
    
  );
};

export default Navbar;