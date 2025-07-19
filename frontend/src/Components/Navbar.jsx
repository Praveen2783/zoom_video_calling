import React, { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton, } from '@clerk/clerk-react';
import { IconButton } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  // let navigate =useNavigation()


  const menuItems = [
    { id: "hero", label: 'Home' },
    { id: "features", label: 'Features' },
    { id: "testimonials", label: 'Testimonials' },
    // {id:"education",label:'Education'},
    //  {id:"contact",label:'Contact'},
  ]

  // smooth scroll method
  const handlerMenu = (sectionId) => {
    setActive(sectionId);
    setOpen(false);

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

  }
  //  check scroll and change navbar bg
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, [])




  // console.log(token)

  return (
    <nav className={`fixed top-0 w-full z-50 transition duration-300 px-[7vw] md:px-[7vw] lg:px-[20vw] ${scrolled ? "bg-[#050414] bg-opacity-50 backdrop-blur-md shadow-md  " : "bg-transparent"
      }`}>
      <div className='text-white py-5 flex justify-between items-center'>
        <div className="text-2xl font-bold text-white">VideoCallify</div>
        <ul className=' hidden md:flex space-x-8 text-gray-300'>
          {
            menuItems.map((item) => (
              <li key={item.id} className={`cursor-pointer  ${scrolled ? "hover:text-blue-500" : "hover:text-gray-900"} ${active === item.id && !scrolled ? "text-gray-900" : active === item.id && scrolled ? "text-blue-500" : ""
                } `}>
                <button onClick={() => {
                  handlerMenu(item.id)
                }}>
                  {item.label}
                </button>
              </li>
            ))
          }
        </ul>



        <div className=' hidden md:flex space-x-4 relative left-36'>
          <SignedOut   >
            <SignInButton className={` text-gray-300   ${scrolled ? "hover:text-blue-500" : "hover:text-gray-900"}`} />
          </SignedOut >

        </div>
        <div className=' hidden md:flex space-x-4'>

          <SignedIn>
            <UserButton className={` text-gray-300   ${scrolled ? "hover:text-blue-500" : "hover:text-gray-900"}`} />
          </SignedIn>

        </div>

        {/* }  */}

        {/* mobile menu icons */}
        <div className='md:hidden'>
          {
            open ? (
              <FiX className={`text-3x ${scrolled ? "text-white]" : "text-gray-900"}l cursor-pointer`}
                onClick={() => setOpen(false)} />
            ) : (
              <FiMenu className='text-3xl ${ scrolled ? "text-white]":"text-gray-900" } cursor-pointer'
                onClick={() => setOpen(true)} />
            )
          }
        </div>


      </div>

      {/* mobile menu items */}
      {
        open && (
          <div className='absolute top-16 left-1/2 tranform -translate-x-1/2 w-4/5 bg-[#050414] bg-opacity-50 backdrop-filter backdrop-blur-lg z-50 rounded-lg shadow-lg md:hidden'>
            <ul className='flex flex-col items-center space-y-4 py-4 text-gray-300'>
              {
                menuItems.map((item) => (
                  <li key={item.id} className={`cursor-pointer  ${scrolled ? "hover:text-blue-500" : "hover:text-gray-900"} ${active === item.id && !scrolled ? "text-gray-900" : active === item.id && scrolled ? "text-blue-500" : ""
                    } `}>
                    <button onClick={() => {
                      handlerMenu(item.id)
                    }}>
                      {item.label}
                    </button>
                  </li>
                ))}

              <div className=' flex space-x-4'>
                <SignedIn>
                  <UserButton className={` text-gray-300   ${scrolled ? "hover:text-blue-500" : "hover:text-gray-900"}`} />
                </SignedIn>
              </div>

              <div className=' flex space-x-4'>
                <SignedOut   >
                  <SignInButton className={` text-gray-300   ${scrolled ? "hover:text-blue-500" : "hover:text-gray-900"}`} />
                </SignedOut >

              </div>





            </ul>
          </div>
        )
      }

    </nav>
  )
}

export default Navbar