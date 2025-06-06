import { IsNotEmpty, IsOptional, IsIn, IsInt, IsDateString } from 'class-validator';
import { JobType } from '../job-types';

export class CreateJobDto {
  @IsNotEmpty()
  job_title: string;

  @IsNotEmpty()
  company_name: string;

  @IsNotEmpty()
  location: string;

  @IsIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
  job_type: JobType;

  @IsOptional()
  @IsInt()
  min_salary?: number;

  @IsOptional()
  @IsInt()
  max_salary?: number;

  @IsOptional()
  job_description?: string;

  @IsOptional()
  requirements?: string;

  @IsOptional()
  responsibilities?: string;

  @IsOptional()
  @IsDateString()
  application_deadline?: string;
}
