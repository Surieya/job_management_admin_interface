import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { JobType } from './job-types';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job_title: string;

  @Column()
  company_name: string;

  @Column()
  location: string;

  @Column({ type: 'varchar', length: 20 })
  job_type: JobType

  @Column({ nullable: true })
  min_salary: number;

  @Column({ nullable: true })
  max_salary: number;

  @Column({ type: 'text', nullable: true })
  job_description: string;

  @Column({ type: 'text', nullable: true })
  requirements: string;

  @Column({ type: 'text', nullable: true })
  responsibilities: string;

  @Column({ type: 'date', nullable: true })
  application_deadline: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
