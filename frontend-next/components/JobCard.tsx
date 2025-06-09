import Image from "next/image";
import AmazonLogo from "../public/amazon_logo.png"
import ExpLogo from "../public/exp_logo.svg"
import JobTypeLogo from "../public/jobtype_logo.svg"
import PackageLogo from "../public/package_logo.svg"



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
    averageSalary:number;
    job_description:string;
  };
}

export default function JobCard({ job }: JobCardProps) {
//   console.log(job)
  return (
    // <div className="border border-gray-300 rounded-md shadow-sm p-6 mb-6 hover:shadow-md transition-shadow duration-200">
    //   <div className="flex justify-between items-center mb-2">
    //     <h3 className="font-semibold text-lg text-gray-900">{job.job_title}</h3>
    //     <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
    //       {job.job_type}
    //     </span>
    //   </div>

    //   <p className="text-sm text-gray-600">
    //     {job.company_name} - {job.location}
    //   </p>

    //   <p className="text-sm mt-3 text-gray-800">
    //     Salary: ${job.min_salary} - ${job.max_salary} / month
    //   </p>

    //   {job.postedAgo && (
    //     <p className="text-xs text-gray-500 mt-1">Posted {job.postedAgo} ago</p>
    //   )}

    //   <button
    //     type="button"
    //     className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-md transition-colors duration-200"
    //   >
    //     Apply Now
    //   </button>
    // </div>


    <div className='font-satoshi flex flex-col gap-5 w-[316px] rounded-[12px] px-[14px] py-[14px] shadow-[0px_0px_14px_rgba(211,211,211,0.15)] '>
       <div className='logo-&-time flex justify-between items-start'>
         <div className='logo w-[83.46px] h-[82px] flex items-center justify-center rounded-[13.18px] bg-linear-to-b from-grey_gradient_from to-grey_gradient_to border-[1px] border-white drop-shadow-[0_0px_10.25px_rgba(148,148,148,0.25)]'>
            <Image src={AmazonLogo} alt='logo' className='w-[80%]'/>
         </div>
         <span className='text-black font-medium text-[14px] bg-secondary_blue px-[10px] py-[7px] rounded-[10px]'>
             {job.postedAgo == "just now" ? job.postedAgo : `${job.postedAgo} Ago`}
         </span>
       </div>
       <p className='job-title text-[20px] font-bold leading-[1] tracking-[0]'>
          {job.job_title}
       </p>
      <div className='job-details text-text_grey flex items-center justify-between w-full pr-5'>
         <div className='flex items-center justify-center gap-[4px]'>
            <Image src={ExpLogo} alt='Experience Logo' className='h-[15.3px] w-[18.9px]' />
            <p className='text-[16px] font-medium text-text_grey'>1-3 yr Exp</p>
       </div>
       <div className='flex items-center justify-center gap-[4px]'>
            <Image src={JobTypeLogo} alt='Job-Type Logo' className='h-[15.3px] w-[18.9px]' />
            <p className='text-[16px] font-medium text-text_grey'>{job.job_type}</p>
       </div>
       <div className='flex items-center justify-center gap-[4px]'>
            <Image src={PackageLogo} alt='Package Logo' className='h-[15.3px] w-[18.9px]' />
            <p className='text-[16px] font-medium text-text_grey'>{job.averageSalary}LPA</p>
       </div>
      </div>
       <ul className='list-disc text-text_grey min-h-[60px] text-[14px] font-medium flex flex-col justify-start pl-4'>
            {job.job_description
               .split('\n')
               .slice(0, 2)
               .map((point, index) => (
                  <li key={index}>{point}</li>
             ))}
       </ul>
       <button className='bg-primary_blue text-white px-[10px] py-[12px] border-[1px] rounded-[10px] drop-shadow-[0_0px_14px_rgba(93,93,93,0.15)]'>
          Apply Now
       </button>
    </div>
  );
}
