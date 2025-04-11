import BookmarkComponent from '@/features/job/bookmark-component';
import JobPostingCard from '@/features/job/job-posting-card';
import ResumeCard from '@/features/job/resume-card';

const JobPage = () => {
  return (
    <div>
      JobPage
      <JobPostingCard jobPosting={mockJobPosting}></JobPostingCard>
      <br />
      <br />
      <ResumeCard resume={mockResume}></ResumeCard>
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

const mockResume = {
  id: 1,
  title: '이력서 제목 조금 더 길게 작성해보자 하하하',
  userId: 'userId',
  status: 1,
  content: '이력서 내용',
  tryCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};
