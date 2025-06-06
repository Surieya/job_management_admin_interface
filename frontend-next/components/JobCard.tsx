interface JobCardProps {
  job: {
    id: number;
    job_title: string;
    company_name: string;
    location: string;
    job_type: string;
    min_salary: number;
    max_salary: number;
    postedAgo?: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="border border-gray-300 rounded-md shadow-sm p-6 mb-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg text-gray-900">{job.job_title}</h3>
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {job.job_type}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        {job.company_name} - {job.location}
      </p>

      <p className="text-sm mt-3 text-gray-800">
        Salary: ${job.min_salary} - ${job.max_salary} / month
      </p>

      {job.postedAgo && (
        <p className="text-xs text-gray-500 mt-1">Posted {job.postedAgo} ago</p>
      )}

      <button
        type="button"
        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition-colors duration-200"
      >
        Apply Now
      </button>
    </div>
  );
}
