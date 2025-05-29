export interface JobData {
  _id: string;
  jobProfile: string;
  salary: string;
  experience: string;
  jobType: 'contract' | 'fulltime';
  status: 'open' | 'closed' | 'draft';
  jobDescription: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}