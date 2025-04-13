'use client';
import ResumeCard from '@/components/common/resume-card';

const ResumeCardsBox = () => {
  return (
    <div className='flex flex-row flex-nowrap gap-5 overflow-x-auto scrollbar-hide'>
      <ResumeCard resume={mockResume} type='interview' />
      <ResumeCard resume={mockResume} type='interview' />
      <ResumeCard resume={mockResume} type='interview' />
      <ResumeCard resume={mockResume} type='interview' />
      <ResumeCard resume={mockResume} type='interview' />
      <ResumeCard resume={mockResume} type='interview' />
      <ResumeCard resume={mockResume} type='interview' />
      <ResumeCard resume={mockResume} type='interview' />
      <ResumeCard resume={mockResume} type='interview' />
    </div>
  );
};

export default ResumeCardsBox;

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
