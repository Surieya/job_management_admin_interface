'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterBar, { FilterState } from '../components/FilterBar';
import JobCard from '../components/JobCard';
import { CreateJobFormData, CreateJobModal } from '../components/CreateJobModal';
import axios from 'axios';

export default function Page() {
  const [filter, setFilter] = useState<FilterState>({
    jobRole: '',
    location: '',
    jobType: '',
    salaryRange: [0, 20000],
  });

  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [createModalOpened, setCreateModalOpened] = useState(false);

  // Fetch jobs when filters change
  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);

      const params: any = {};
      if (filter.jobRole) params.job_title = filter.jobRole;
      if (filter.location) params.location = filter.location;
      if (filter.jobType) params.job_type = filter.jobType;
      if (filter.salaryRange) {
        params.min_salary = filter.salaryRange[0];
        params.max_salary = filter.salaryRange[1];
      }

      try {
        const res = await axios.get('/api/jobs', { params });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [filter]);

  async function handleCreateJob(data: CreateJobFormData) {
    try {
      await axios.post('/api/jobs', {
        ...data,
        min_salary: data.min_salary,
        max_salary: data.max_salary,
      });
      setCreateModalOpened(false);
      // Refresh jobs after creation
      setFilter({ ...filter }); // trigger useEffect
    } catch (err) {
      console.error('Failed to create job', err);
    }
  }

  return (
    <>
      <Navbar onOpenCreateModal={() => setCreateModalOpened(true)} />

      <main className="mx-auto px-4 pt-20 pb-10 w-full">

        <FilterBar onFilterChange={setFilter} />

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
          <div className="flex flex-col space-y-6 mt-8">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>

      <CreateJobModal
        opened={createModalOpened}
        onClose={() => setCreateModalOpened(false)}
        onSubmit={handleCreateJob}
      />
    </>
  );
}
