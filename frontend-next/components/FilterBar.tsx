import { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";

export interface FilterState {
  jobRole: string;
  location: string;
  jobType: string;
  salaryRange: [number, number];
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    jobRole: '',
    location: '',
    jobType: '',
    salaryRange: [0, 200000], 
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);


  const handleMinSalaryChange = (value: number) => {
    if (value <= filters.salaryRange[1]) {
      setFilters({ ...filters, salaryRange: [value, filters.salaryRange[1]] });
    }
  };

  return (
<div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-6 justify-evenly md:space-y-0 mt-6 w-full rounded-md p-8 shadow-md shadow-shadow-grey-200">
  {/* Search Input */}
  <div className="w-full flex items-center border-r md:border-r md:border-gray-300 pr-4">
    <div className="w-full flex rounded-md px-2 py-2 w-fit focus-within:ring-1 focus-within:ring-black focus-within:border-black transition">
      <IoSearchOutline className="text-gray-500 text-xl mr-2" />
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
    <div className="w-full flex items-center rounded-md px-2 py-2 w-fit focus-within:ring-2 focus-within:ring-black focus-within:border-black transition">
      <CiLocationOn className="text-gray-500 text-xl mr-2" />
      <input
        type="text"
        placeholder="Preferred Location"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        className="outline-none w-40 w-full"
      />
    </div>
  </div>

  {/* Job Type Dropdown */}
  <div className="w-full flex items-center border-r md:border-r md:border-gray-300 pr-4">
    <div className="w-full flex items-center rounded-md px-2 py-2 w-fit bg-white focus-within:ring-2 focus-within:ring-black focus-within:border-black transition">
      <IoPersonOutline className="text-gray-500 text-xl mr-2" />
      <select
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
      </select>
    </div>
  </div>

  {/* Salary Slider */}
  <div className="w-full flex flex-col">
    <label className="text-sm font-semibold mb-2 text-gray-700 flex justify-between">
      <span>Salary Per Month:</span>
      <span className="font-medium">{filters.salaryRange[0]}</span>
    </label>
    <input
      type="range"
      min={0}
      max={200000}
      step={2000}
      value={filters.salaryRange[0]}
      onChange={(e) => handleMinSalaryChange(Number(e.target.value))}
      className="w-full accent-black cursor-pointer"
    />
  </div>
</div>
  );
}
