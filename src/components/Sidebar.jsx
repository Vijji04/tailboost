import React from 'react';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,

} from '@heroicons/react/20/solid';

function Sidebar() {
  return (
    <div className='container h-full w-1/6'>
        <img
                        className="md:h-14 h-8  w-20 md:w-full py-2  pt-2 flex item-center justify-center  bg-[#212936] "
                        src="https://asset.brandfetch.io/idR0dj2M6E/idm318jLFd.svg"
                        alt="Your Company"
          />
      <div className='bg-[#212936] px-2 text-white gap-12 flex flex-col justify-center py-6 items-center h-full'>

        {/* Icons for mobile screens */}
        <div className="flex flex-col gap-12 md:hidden">
          <BriefcaseIcon className="h-6 w-6 text-white" />
          <CalendarIcon className="h-6 w-6 text-white" />
          <CheckIcon className="h-6 w-6 text-white" />
          <AcademicCapIcon className="h-6 w-6 text-white" />

          <ChevronDownIcon className="h-6 w-6 text-white" />
        </div>

        {/* Links for medium to large screens */}
        <div className="hidden md:flex flex-col gap-6">
          <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">My Courses</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Account</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Settings</a>
          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Reports</a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

