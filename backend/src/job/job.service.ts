import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, FindOptionsWhere, ILike } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { getTimeAgo ,getAverageSalary} from 'src/utils/date-utils';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create(createJobDto);
    return this.jobRepository.save(job);
  }

  async filter(query: any): Promise<Job[]> {
    const where: FindOptionsWhere<Job> = {};
    let filteredJobs = <any>[];

    if (query.job_title) where.job_title = ILike(`%${query.job_title}%`);
    if (query.location) where.location = ILike(`%${query.location}%`);
    if (query.job_type) where.job_type = query.job_type;

    const jobs = await this.jobRepository.find({ where });

    if (query.min_salary) {
        const minSalary = parseInt(query.min_salary) * 12;
        const maxSalary = (minSalary + 30000) *12;
        // const expectedAnnualSalary = monthlySalary * 12;

  if(minSalary == 0){
    filteredJobs = jobs;
  }else{
     filteredJobs = jobs.filter(job => {
    const jobMin = job.min_salary;
    const jobMax = job.max_salary;

    // Job salary range intersects with expected range
    return jobMax >= minSalary && jobMin <= maxSalary;
  });

  }
 
  // return filteredJobs;
}

    


     return filteredJobs?.map((job : Job) => ({
    ...job,
    postedAgo: getTimeAgo(job.created_at),
    averageSalary:getAverageSalary(job.min_salary , job.max_salary),
     }));
  }
}

