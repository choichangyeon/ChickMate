export type JobPosting = {
  id: number;
  company: string;
  title: string;
  location: JSON;
  experienceType: string;
  url: string;
  jobType: string;
  employmentType: string;
  educationLevel: string;
  postedAt: Date;
  expiredAt: Date;
  createdAt: Date;
};
