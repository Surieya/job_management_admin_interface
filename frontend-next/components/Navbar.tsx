import { useState } from 'react';
import Logo from "../public/cyberminds_logo.svg"
import Image from 'next/image';

interface NavbarProps {
  onOpenCreateModal: () => void;
}

export default function Navbar({ onOpenCreateModal }: NavbarProps) {
  const [opened, setOpened] = useState(false);

  return (
    <header className="font-satoshi relative top-0 left-0 right-0 w-full bg-white z-50 flex justify-center flex-col md:flex-row">
      
       {/* <div className="flex items-center h-full w-full max-w-[890px] rounded-full"> */}
        {/* Left side: logo + nav links */}
        <div className="w-full max-w-[890px] flex items-center justify-between rounded-full px-[26px] py-[16px] shadow-[0px_0px_20px_rgba(127,127,127,0.15)]">
          <Image src={Logo} alt="Cyberminds-Logo" className="w-[44px] h-[44.68px]" />

          <nav className="hidden md:flex gap-16 text-[12px] text-[16px] text-text_grey font-medium">
            <a href="#" className="hover:text-blue-600 cursor-pointer">Home</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Jobs</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Find Talents</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">About us</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Testimonial</a>
            
          </nav>

        <button
          onClick={onOpenCreateModal}
          className="hidden md:block text-white px-[24px] py-[8px] rounded-[30px] text-[16px] text-center leading-none bg-linear-to-b from-violet-start to-violet-end"
        >
          Create Jobs
        </button>

         <button
          onClick={() => setOpened(!opened)}
          aria-label={opened ? 'Close navigation' : 'Open navigation'}
          className="block md:hidden mr-4 focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {opened ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        </div>

        {/* Burger menu - visible on small screens only */}
        {/* <button
          onClick={() => setOpened(!opened)}
          aria-label={opened ? 'Close navigation' : 'Open navigation'}
          className="block md:hidden mr-4 focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {opened ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button> */}

        {/* Create Job button */}

      {/* </div> */}
     

      {/* Mobile menu dropdown */}
      {opened && (
        <nav className="md:hidden rounded-md bg-white border-t border-gray-200 shadow-md w-full absolute z-50 right-[10px] top-[85px] py-4">
          <div className="flex flex-col items-center justify-center px-4 py-2 space-y-2 text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-600 cursor-pointer">Home</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Find Jobs</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Find Talents</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">About us</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Testimonial</a>
       <button
          onClick={onOpenCreateModal}
          className="text-white px-[24px] py-[8px] rounded-[30px] text-[16px] text-center leading-none bg-linear-to-b from-violet-start to-violet-end"
        >
          Create Jobs
        </button>
          </div>
        </nav>
      )}
    </header>
  );
}
