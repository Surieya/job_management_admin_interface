'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterBar, { FilterState } from '../components/FilterBar';
import JobCard from '../components/JobCard';
import { CreateJobFormData, CreateJobModal } from '../components/CreateJobModal';
import useDebouncedEffect from "../components/UseDebounce";
import axios from 'axios';

export default function Page() {
  const [filter, setFilter] = useState<FilterState>({
    jobRole: '',
    location: '',
    jobType: '',
    salaryRange: [0, 210000],
  });

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [createModalOpened, setCreateModalOpened] = useState(false);

  // Fetch jobs when filters change
  // useEffect(() => {
  //   async function fetchJobs() {
  //     setLoading(true);

  //     const params: any = {};
  //     if (filter.jobRole) params.job_title = filter.jobRole;
  //     if (filter.location) params.location = filter.location;
  //     if (filter.jobType) params.job_type = filter.jobType;
  //     if (filter.salaryRange) {
  //       params.min_salary = filter.salaryRange[0];
  //     }

  //     try {
  //       const res = await axios.get('/api/jobs', { params });
  //       // console.log(res);
  //       setJobs(res.data);
  //       console.log(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchJobs();
  // }, [filter]);

  useDebouncedEffect(() => {
  async function fetchJobs() {
    setLoading(true);

    const params: any = {};
    if (filter.jobRole) params.job_title = filter.jobRole;
    if (filter.location) params.location = filter.location;
    if (filter.jobType) params.job_type = filter.jobType;
    if (filter.salaryRange) {
      params.min_salary = filter.salaryRange[0];
    }

    try {
      const res = await axios.get('/api/jobs', { params });
      setJobs(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  fetchJobs();
}, [filter], 500);

  

  return (
    <>
      <section className='header flex w-full flex-col pt-6 gap-4 shadow-[0px_0px_14px_rgba(198,191,191,0.25)]'>
            <Navbar onOpenCreateModal={() => setCreateModalOpened(true)} />
            <FilterBar onFilterChange={setFilter} />
      </section>

   

      <main className="mx-auto px-4 pt-20 pb-10 w-full">

        

        {loading ? (
          <div className="flex justify-center mt-16">
            <svg
              className="animate-spin h-12 w-12 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : jobs.length === 0 ? (
          <div className="flex justify-center mt-16">
            <p className="text-gray-500 text-lg">No jobs found matching the filters.</p>
          </div>
        ) : (
          

       <div className='md:px-4'>
         <div className="flex flex-wrap gap-10 md:gap-4 px-8 items-center justify-center md:justify-start">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
      </div>
       </div>
        
        )}
      </main>

      <CreateJobModal
        opened={createModalOpened}
        onClose={() => setCreateModalOpened(false)}
        filter = {filter}
        setFilter = {setFilter}
        // onSubmit={handleCreateJob}
      />
    </>
  );
}
