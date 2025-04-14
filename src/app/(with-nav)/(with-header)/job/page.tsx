import BookmarkComponent from '@/features/job/bookmark-component';
import JobPostingCard from '@/components/common/job-posting-card';

const JobPage = () => {
  return (
    <div>
      JobPage
      <JobPostingCard jobPosting={mockJobPosting}></JobPostingCard>
      <br />
      <br />
      <BookmarkComponent jobPostingId={1} />
    </div>
  );
};

export default JobPage;

const mockJobPosting = {
  id: 1,
  company: '삼성전자',
  title: '삼성전자 신입사원 모집',
  experienceType: '신입',
  expiredAt: new Date('2023-12-31'),
  postedAt: new Date('2023-01-01'),
  jobType: '의료',
  location: {
    mainRegion: '서울',
    subRegion: '강남구',
  },
  educationLevel: '대졸(4년)',
  url: 'https://www.samsung.com/sec/careers/',
  employmentType: '정규직',
  createdAt: new Date(),
};

