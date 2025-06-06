import { useState } from 'react';

interface NavbarProps {
  onOpenCreateModal: () => void;
}

export default function Navbar({ onOpenCreateModal }: NavbarProps) {
  const [opened, setOpened] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-[80px] bg-white z-50 flex justify-center">
      
       <div className="flex items-center justify-around h-full px-4 w-full max-w-[880px] rounded-full shadow-md shadow-shadow-grey-200">
        {/* Left side: logo + nav links */}
        <div className="flex items-center justify-evenly w-full gap-5">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />

          {/* Nav links - hidden on small, flex on md+ */}
          <nav className="hidden md:flex ml-6 space-x-6 gap-6 text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-600 cursor-pointer">Home</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Jobs</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Find Talents</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">About us</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Testimonial</a>
            
          </nav>

        <button
          onClick={onOpenCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap bg-linear-to-b from-violet-start to-violet-end"
        >
          Create Jobs
        </button>
        </div>

        {/* Burger menu - visible on small screens only */}
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

        {/* Create Job button */}

      </div>
     

      {/* Mobile menu dropdown */}
      {opened && (
        <nav className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="flex flex-col px-4 py-2 space-y-2 text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-600 cursor-pointer">Home</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Find Jobs</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Find Talents</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">About us</a>
            <a href="#" className="hover:text-blue-600 cursor-pointer">Testimonial</a>
            
          </div>
        </nav>
      )}
    </header>
  );
}
