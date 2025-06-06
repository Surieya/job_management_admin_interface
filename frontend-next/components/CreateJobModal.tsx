import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { IoPersonOutline } from 'react-icons/io5';



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
  onSubmit: (data: CreateJobFormData) => void;
}

export function CreateJobModal({ opened, onClose, onSubmit }: CreateJobModalProps) {
  const {
    register,
    handleSubmit,
    watch,
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

  if (!opened) return null;

  return (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
    <h2 className="text-2xl font-semibold mb-6">Create Job Opening</h2>

    <button
      onClick={onClose}
      className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
    >
      ×
    </button>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Row 1: Job Title & Company Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Job Title</label>
          <input
            type="text"
            {...register('job_title', { required: 'Job title is required' })}
            className="input-field placeholder-gray-400"
            placeholder="Enter job title"
          />
          {errors.job_title && <p className="text-red-500 text-sm">{errors.job_title.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Company Name</label>
          <input
            type="text"
            {...register('company_name', { required: 'Company name is required' })}
            className="input-field placeholder-gray-400"
            placeholder="Enter company name"
            disabled={!jobTitle}
          />
          {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name.message}</p>}
        </div>
      </div>

      {/* Row 2: Location & Job Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            {...register('location', { required: 'Location is required' })}
            className="input-field placeholder-gray-400"
            placeholder="Enter location"
            disabled={!companyName}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Job Type</label>
          <select
            {...register('job_type', { required: 'Job type is required' })}
            className="input-field placeholder-gray-400"
            disabled={!location}
          >
            <option value="">Select job type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
          {errors.job_type && <p className="text-red-500 text-sm">{errors.job_type.message}</p>}
        </div>
      </div>

      {/* Row 3: Salary Range & Application Deadline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium flex items-center gap-1">
            <IoPersonOutline className="text-gray-500" />
            Salary Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              {...register('min_salary', { min: 0 })}
              className="input-field placeholder-gray-400 w-full"
              placeholder="Min"
              disabled={!jobType}
            />
            <input
              type="number"
              {...register('max_salary', {
                min: 0,
                validate: (value) =>
                  !value ||
                  (watch('min_salary') !== undefined && Number(value) >= Number(watch('min_salary'))) ||
                  'Max salary should be >= Min salary',
              })}
              className="input-field placeholder-gray-400 w-full"
              placeholder="Max"
              disabled={!minSalary}
            />
          </div>
          {errors.max_salary && <p className="text-red-500 text-sm">{errors.max_salary.message}</p>}
        </div>

        <div>
          <label className="block font-medium flex items-center gap-1">
            <IoPersonOutline className="text-gray-500" />
            Application Deadline
          </label>
          <input
            type="date"
            {...register('application_deadline')}
            className="input-field placeholder-gray-400 w-full"
            disabled={!minSalary}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium">Job Description</label>
        <textarea
          {...register('job_description')}
          className="input-field placeholder-gray-400"
          placeholder="Enter job description"
          disabled={!maxSalary}
        />
      </div>

      {/* Responsibilities */}
      <div>
        <label className="block font-medium">Responsibilities</label>
        <textarea
          {...register('responsibilities')}
          className="input-field placeholder-gray-400"
          placeholder="Enter responsibilities"
          disabled={!jobDescription}
        />
      </div>

            <div>
        <label className="block font-medium">Requirements</label>
        <textarea
          {...register('requirements')}
          className="input-field placeholder-gray-400"
          placeholder="Enter requirements"
          disabled={!jobDescription}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Save Draft
        </button>
        <button
          type="submit"
          disabled={!requirements}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Publish
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
