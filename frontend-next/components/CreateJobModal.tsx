import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { IoPersonOutline } from 'react-icons/io5';
import { FilterState } from './FilterBar';
import UpDownArrow from "../public/up_down_arrow.svg"
import DownArrow from "../public/downarrow.svg";
import SideArrow from "../public/sidearrow.svg";
import axios from 'axios';

import Image from 'next/image';



export interface CreateJobFormData {
  job_title: string;
  company_name: string;
  location: string;
  job_type: string;
  min_salary: number;
  max_salary: number;
  job_description: string;
  requirements: string;
  responsibilities: string;
  application_deadline: string;
}

interface CreateJobModalProps {
  opened: boolean;
  onClose: () => void;
  filter: FilterState;
  setFilter: Dispatch<SetStateAction<FilterState>>
}

export function CreateJobModal({ opened, onClose,filter,setFilter}: CreateJobModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateJobFormData>();

  const jobTitle = watch('job_title');
  const companyName = watch('company_name');
  const location = watch('location');
  const jobType = watch('job_type');
  const minSalary = watch('min_salary');
  const maxSalary = watch('max_salary');
  const jobDescription = watch('job_description');
  const requirements = watch('requirements');
  const responsibilities = watch('responsibilities');
  const deadline = watch('application_deadline')
  const today = new Date().toISOString().split('T')[0];


  if (!opened) return null;


  async function handleCreateJob(data: CreateJobFormData) {
      try {
       console.log(data);
        await axios.post('/api/jobs', {
          ...data,
          min_salary: data.min_salary,
          max_salary: data.max_salary,
        });
        reset();
        onClose();
        // Refresh jobs after creation
        setFilter({ ...filter });
      } catch (err) {
        console.error('Failed to create job', err);
      }
    }

  return (

<div className="font-satoshi fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div className="bg-white w-full max-w-[768px] p-6 rounded-[10px] shadow-lg relative overflow-y-auto max-h-[90vh] shadow-[0px_0px_24px_rgba(169,169,169,0.25)]">
    <h2 className="text-[24px] font-semibold mb-6 text-center">Create Job Opening</h2>

    <button
      onClick={onClose}
      className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
    >
      ×
    </button>

    <form onSubmit={handleSubmit(handleCreateJob)} className="space-y-6">
      {/* Row 1: Job Title & Company Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={`block font-medium pb-1 ${jobTitle?.length > 0 ?'text-black':'text-text_grey_secondary'}`}>Job Title</label>
          <input
            type="text"
            {...register('job_title', { required: 'Job title is required' })}
            className={`input-field  ${jobTitle?.length > 0 ?'border-[1px] border-black':'border-[1px] border-black'}`}
            placeholder="Full Stack Developer"
          />
          {errors.job_title && <p className="text-red-500 text-sm">{errors.job_title.message}</p>}
        </div>

        <div>
          <label className={`block font-medium pb-1 ${companyName?.length > 0 ?'text-black':'text-text_grey_secondary'}`}>Company Name</label>
          <input
            type="text"
            {...register('company_name', { required: 'Company name is required' })}
            className={`input-field ${companyName?.length > 0 ?'border-[1px] border-black':'border-[1px] border-border_grey_secondary'}`}
            placeholder="Amazon, Microsoft, Swiggy"
            disabled={!jobTitle}
          />
          {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name.message}</p>}
        </div>
      </div>

      {/* Row 2: Location & Job Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={`block font-medium pb-1 ${location?.length > 0 ?'text-black':'text-text_grey_secondary'}`}>Location</label>
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className={`input-field ${location?.length > 0 ?'border-[1px] border-black':'border-[1px] border-border_grey_secondary'}`}
            placeholder="Enter Preferred Location"
            disabled={!companyName}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <div>
          <label className={`block font-medium pb-1 ${jobType?.length > 0 ?'text-black':'text-text_grey_secondary'}`}>Job Type</label>
          <select
            {...register('job_type', { required: 'Job type is required' })}
            className={`input-field ${jobType?.length > 0 && location.length > 0 ?'border-[1px] border-black text-black':'border-[1px] border-border_grey_secondary text-text_grey'}`}
            disabled={!location}
          >
            <option>Fulltime</option>
             <option>Internship</option>
            <option>Parttime</option>
            <option>Contract</option>
           
          </select>
          {errors.job_type && <p className="text-red-500 text-sm">{errors.job_type.message}</p>}
        </div>
      </div>

      {/* Row 3: Salary Range & Application Deadline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={`block font-medium pb-1 flex items-center gap-1 ${minSalary > 0 ?'text-black':'text-text_grey_secondary'}`}>
            Salary Range
          </label>
          <div className="flex gap-2">
            <div className={`input-field flex items-center gap-2 ${minSalary > 0 ?'border-[1px] border-black':'border-[1px] border-border_grey_secondary'}`}>
               <Image src={UpDownArrow} alt="updown-arrow-img" className='w-4 h-4' />
            <input
              type="number"
              {...register('min_salary', { min: {
                value:0,
                message:'Minimum salary cannot be less that 0'
              }, })}
              className=" placeholder-gray-400 w-full outline-none"
              placeholder="₹0"
              disabled={!jobType}
            />
            </div>
            <div className={`input-field flex items-center gap-2 ${maxSalary > 0 ?'border-[1px] border-black':'border-[1px] border-border_grey_secondary'}`}>
              <Image src={UpDownArrow} alt="updown-arrow-img" className='w-4 h-4' />
              <input
              type="number"
              {...register('max_salary', {
                min: 0,
                validate: (value) =>
                  !value ||
                  (watch('min_salary') !== undefined && Number(value) >= Number(watch('min_salary'))) ||
                  'Max salary should be >= Min salary',
              })}
              className="placeholder-gray-400 w-full outline-none"
              placeholder="₹12,00,000"
              disabled={!minSalary}
            />
            </div>

          </div>
             {errors.min_salary && (
               <p className="text-red-500 text-sm">{errors.min_salary.message}</p>
                )}
              {errors.max_salary && (
                <p className="text-red-500 text-sm">{errors.max_salary.message}</p>)}
        </div>

        <div>
          <label className={`block font-medium pb-1 flex items-center gap-1 ${maxSalary > 0 ?'text-black':'text-text_grey_secondary'}`}>
            Application Deadline
          </label>
          <div className={`input-field-modified flex flex-row items-center justify-end px-2 pl-4 gap-2 ${maxSalary > 0 ?'border-[1px] border-black py-[8px]':'border-[1px] border-border_grey_secondary py-[10.5px] '}`}>
            <span className='flex-grow'>
              {deadline}
            </span>
            <span className='datepicker-toggle'>
              <span className='datepicker-toggle-button'>
                   <input
                       type="date"
                          {...register('application_deadline')}
                           className="datepicker-input"
                           min={today}
                            disabled={!minSalary}
          />
              </span>
            </span>
            
          {/* <Image src={DateImg} alt="updown-arrow-img" className='w-4 h-4' /> */}
          </div>
          
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={`block font-medium pb-1 ${jobDescription?.length > 0 ?'text-black':'text-text_grey_secondary'}`}>Job Description</label>
        <textarea
          {...register('job_description',{
            required:"Job description is required"
          })}
          className={`input-field min-h-[200px] ${jobDescription?.length > 0 ?'border-[1px] border-black':'border-[1px] border-border_grey_secondary'}`}
          placeholder="Enter job description"
          disabled={!maxSalary}
        />
        {errors.job_description && (
            <p className="text-red-500 text-sm">{errors.job_description.message}</p>)}
      </div>

      {/* Responsibilities */}
      <div>
        <label className={`block font-medium pb-1 ${responsibilities?.length > 0 ?'text-black':'text-text_grey_secondary'}`}>Responsibilities</label>
        <textarea
          {...register('responsibilities')}
          className={`input-field min-h-[200px] ${responsibilities?.length > 0 ?'border-[1px] border-black':'border-[1px] border-border_grey_secondary'}`}
          placeholder="Enter responsibilities"
          disabled={!jobDescription}
        />
      </div>


      <div>
        <label className={`block font-medium pb-1 ${requirements?.length > 0 ?'text-black':'text-text_grey_secondary'}`}>Requirements</label>
        <textarea
          {...register('requirements')}
          className={`input-field min-h-[200px] ${requirements?.length > 0 ?'border-[1px] border-black':'border-[1px] border-border_grey_secondary'}`}
          placeholder="Enter requirements"
          disabled={!jobDescription}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4 pt-4">
        <button
          type="button"
          className="bg-white text-[20px] text-black px-[30px] sm:px-[60px] py-[16] rounded-[10px] hover:bg-gray-400 flex items-center gap-2 border-[2px] border-black"
        >
          Save Draft 
          <Image src={DownArrow} alt='sideArrow' className='h-[8px] w-[10px]' />
        </button>
        <button
          type="submit"
          disabled={!requirements}
          className="bg-primary_blue text-[20px] text-white px-[30px] sm:px-[60px] py-[16px] rounded-[10px] hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          Publish
          <Image src={SideArrow} alt='sideArrow' className='h-[8px] w-[10px]' />
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
