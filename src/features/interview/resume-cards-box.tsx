'use client';
import ResumeCard from '@/components/common/resume-card';
import { useEffect } from 'react';
import useResumeStore from '@/features/interview/hooks/use-resume-store';
import { useSubmitResumesQuery } from '@/hooks/queries/use-submit-resumes-query';

const ResumeCardsBox = () => {
  const { id: selectedId, setResume } = useResumeStore();
  const { data: resumeList, isLoading, isError } = useSubmitResumesQuery();

  useEffect(() => {
    if (selectedId === null && isLoading === false) {
      if (resumeList && resumeList.length > 0) {
        setResume(resumeList[0].id);
      }
    }
  }, [resumeList]);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !resumeList) return <div>Error...</div>;
  // TODO: 자소서 작성 페이지 라우팅 UI 구현
  if (resumeList.length === 0) return <div>no data 1</div>;

  return (
    <div className='flex max-w-[100vw] flex-row flex-nowrap gap-5 overflow-x-auto scrollbar-hide'>
      {resumeList.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          type='interview'
          isSelected={selectedId === resume.id}
          onSelect={() => setResume(resume.id)}
        />
      ))}
    </div>
  );
};

export default ResumeCardsBox;
