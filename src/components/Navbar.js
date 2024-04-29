'use client'

import { RiSearchLine } from 'react-icons/ri'; 
import { MenuList } from "@/menulist/Menulist";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Image from 'next/image';

export default function Navbar({ setIsExpanded }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = (idx) => {
    if (openSubMenuIndex === idx) {
      setOpenSubMenuIndex(null); 
    } else {
      setOpenSubMenuIndex(idx); 
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenSubMenuIndex(null);
  };

  return (
    <nav className="bg-gray-800 p-1 md:p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-shrink-0 text-white">
          <Image
            src="https://arthakendra.com/sharehub/assets/sharehub-yIE25QB_.svg"
            className="h-16 md:h-20 mr-4"
            width={100}
            height={100}
            alt="logo"
          />
          {/* Search Area */}
          <div className="flex items-center bg-white rounded-md px-2 mr-4 ml-4">
            <input
              type="text"
              placeholder="Search"
              className="py-1 px-2 bg-transparent border-none focus:outline-none text-gray-900"
            />
            <button className="focus:outline-none">
              <RiSearchLine className="h-4 w-4 text-slate-900" /> 
            </button>
          </div>
        </div>
        
        <div className="hidden md:flex gap-3">
          {MenuList.map((item, idx) => (
            <MenuItem
              key={idx}
              item={item}
              pathname={pathname}
              isOpen={openSubMenuIndex === idx}
              onClick={() => toggleSubMenu(idx)}
              closeMenu={closeMenu}
            />
          ))}
        </div>
        <div className="block md:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
            onClick={toggleMenu}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 0h20v2H0V0zm0 8h20v2H0V8zm0 8h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <div className="px-2 pt-2 pb-3">
          {MenuList.map((item, idx) => (
            <MenuItem
              key={idx}
              item={item}
              pathname={pathname}
              isOpen={openSubMenuIndex === idx}
              onClick={() => toggleSubMenu(idx)}
              closeMenu={closeMenu}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

const MenuItem = ({ item, pathname, isOpen, onClick, closeMenu }) => {
  const toggleSubMenu = () => {
    onClick();
  };

  return (
    <div className="text-sm relative">
      {item.subMenus ? (
        <div>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            onClick={toggleSubMenu}
          >
            {item.title}
            <MdOutlineKeyboardArrowDown className={`ml-2 h-5 w-5 ${isOpen ? "transform rotate-180" : ""}`} />
          </button>
          {isOpen && (
            <div className="absolute z-50 bg-gray-800 rounded-lg mt-2 w-40">
              {item.subMenus.map((subItem, idx) => (
                <Link key={idx} href={subItem.path}>
                  <div className="cursor-pointer block px-4 py-2 text-sm text-white hover:bg-gray-700" onClick={closeMenu}>
                    {subItem.title}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link href={item.path}>
          <div
            className={`block px-4 py-2 text-sm text-white ${
              pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"
            } cursor-pointer`}
            onClick={closeMenu}
          >
            {item.title}
          </div>
        </Link>
      )}
    </div>
  );
};
