import { useState, useEffect } from 'react';
import {Select} from "@headlessui/react"

import JobtypeImg from "../public/job_type.svg"
import LocationImg from "../public/Location.svg"
import SearchImg from "../public/search_logo.svg"
import SliderThumb from "../public/slider_thumb.svg"
import Image from 'next/image';

export interface FilterState {
  jobRole: string;
  location: string;
  jobType: string;
  salaryRange: [number, number];
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

const jobTypes = ['Fulltime', 'Parttime', 'Contract', 'Internship'];

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    jobRole: '',
    location: '',
    jobType: '',
    salaryRange: [0, 210000], 
  });

const [filledPercent, setFilledPercent] = useState(0);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  useEffect(() => {
  const percent = (((filters.salaryRange[0]) / 210000) * 87);
  setFilledPercent(Math.floor(percent));
}, [filters.salaryRange[0]]);


  const handleMinSalaryChange = (value: number) => {
    if (value <= filters.salaryRange[1]) {
      setFilters({ ...filters, salaryRange: [value, filters.salaryRange[1]] });
    }
  };

  return (
<div className="font-satoshi flex flex-col md:flex-row md:items-center justify-evenly md:space-y-0 w-full gap-2 rounded-md px-[24px] py-[16px]">
  {/* Search Input */}
  <div className="w-full flex items-center border-r md:border-r md:border-gray-300 pr-4">
    <div className="w-full flex items-center rounded-md px-2 py-2 focus-within:ring-2 focus-within:ring-black focus-within:border-black transition">
      <Image src={SearchImg} alt="Search-img" className='text-gray-500 w-[16px] h-[21px] mr-4' />
      <input
        type="text"
        placeholder="Search By Job Title,Role"
        value={filters.jobRole}
        onChange={(e) => setFilters({ ...filters, jobRole: e.target.value })}
        className="border-none outline-none w-full bg-transparent"
      />
    </div>
  </div>

  {/* Location Input */}
  <div className=" w-full flex items-center border-r md:border-r md:border-gray-300 pr-4">
    <div className="w-full flex items-center rounded-md px-2 py-2 focus-within:ring-2 focus-within:ring-black focus-within:border-black transition">
      {/* <CiLocationOn className="text-gray-500 text-xl mr-2" /> */}
      <Image src={LocationImg} alt="Search-img" className='text-gray-500 w-[16px] h-[21px] mr-4' />
      <input
        type="text"
        placeholder="Preferred Location"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        className="outline-none w-40 w-full text-[16px]"
      />
    </div>
  </div>

  {/* Job Type Dropdown */}
  <div className="w-full flex items-center border-r md:border-r md:border-gray-300 pr-4">
    <div className="w-full flex items-center rounded-md px-2 py-2 bg-white focus-within:ring-2 focus-within:ring-black focus-within:border-black transition">
      <Image src={JobtypeImg} alt="Search-img" className='text-gray-500 w-[16px] h-[21px] mr-4' />
      <Select
        value={filters.jobType}
        onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
        className="outline-none w-40 bg-white text-gray-500 w-full"
      >
          <option value="">Select Job Type</option>
        {jobTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
        
      </Select>
    </div>
  </div>

  {/* Salary Slider */}
  <div className="relative w-full flex flex-col px-11 pt-4 md:p-4 justify-center">
   
    <div 
      style={{ width: `${filledPercent}%` }}
      className={`absolute bg-black h-[4px]`}>
    </div>
    <div 
      style={{ width:`${87 - filledPercent}%`,
               marginLeft:`${filledPercent}%`
       }}
      className={`absolute bg-border_grey_secondary h-[4px] `}>
    </div>
    <div className='absolute'>
      <Image src={SliderThumb} alt='Slider-thumb' width={20} height={20} />
    </div>
    
    <label className="text-sm font-semibold mb-4 text-gray-700 flex justify-between">
      <span className='text-[14px] lg:text-[16px] md:ml-[-10px]'>Salary Per Month:</span>
      <span className=" text-[14px] lg:text-[16px] font-bold">{filters.salaryRange[0] == 0 ? 0 : `₹${filters.salaryRange[0]/1000}k - ₹${(filters.salaryRange[0]+30000)/1000}k`}</span>
    </label>
    <input
      type="range"
      min={0}
      max={210000}
      step={30000}
      value={filters.salaryRange[0]}
      onChange={(e) => handleMinSalaryChange(Number(e.target.value))}
      className={`w-full range-custom mb-8 z-10`}
    />
  </div>
</div>
  );
}
