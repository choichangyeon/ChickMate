import { JsonValue } from 'next-auth/adapters';

export type JobPosting = {
  experienceType: string;
  educationLevel: string;
  jobType: string;
  id: number;
  title: string;
  company: string;
  location: JsonValue;
  url: string;
  employmentType: string;
  postedAt: Date;
  expiredAt: Date;
  createdAt: Date;
};
