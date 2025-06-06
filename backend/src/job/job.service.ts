import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, FindOptionsWhere } from 'typeorm';
import { Job } from './job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { getTimeAgo } from 'src/utils/date-utils';

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

    if (query.job_title) where.job_title = Like(`%${query.job_title}%`);
    if (query.location) where.location = Like(`%${query.location}%`);
    if (query.job_type) where.job_type = query.job_type;
    if (query.salary) {
      const salary = parseInt(query.salary);
      where.min_salary = Between(0, salary);
      where.max_salary = Between(salary, 10000000); // Arbitrary upper bound
    }

    const jobs = await this.jobRepository.find({ where });


      return jobs.map((job) => ({
    ...job,
    postedAgo: getTimeAgo(job.created_at),
     }));
  }
}

