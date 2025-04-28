'use client';
import ResumeCard from '@/features/interview/resume-card';
import { useEffect } from 'react';
import useResumeStore from '@/features/interview/hooks/use-resume-store';
import { useSubmitResumesQuery } from '@/hooks/queries/use-submit-resumes-query';
import LoadingAnimation from '@/components/common/loading-animation';
import { Session } from 'next-auth';
import InterviewBlockComponent from '@/features/interview/interview-block-component';

type Props = {
  session: Session | null;
};

const ResumeCardsBox = ({ session }: Props) => {
  const { resumeId: selectedId, setResume } = useResumeStore();
  const { data: resumeList, isLoading, isError } = useSubmitResumesQuery();

  useEffect(() => {
    if (selectedId === null && isLoading === false) {
      if (resumeList && resumeList.length > 0) {
        setResume(resumeList[0].id);
      }
    }
  }, [resumeList]);

  if (!session) return <InterviewBlockComponent type='unauthenticated' />;

  if (isLoading) {
    return (
      <div className='mt-8 flex items-center justify-center'>
        <LoadingAnimation />
      </div>
    );
  }
  if (isError || !resumeList)
    return (
      <section className='flex h-44 max-w-[100vw] flex-col items-center justify-center'>
        <InterviewBlockComponent type='getResumeListError' />
      </section>
    );

  if (resumeList.length === 0)
    return (
      <section className='flex h-44 max-w-[100vw] flex-col items-center justify-center'>
        <InterviewBlockComponent type='emptyResumeError' />
      </section>
    );

  return (
    <section className='flex max-w-[100vw] flex-row flex-nowrap gap-5 overflow-x-auto scrollbar-hide'>
      {resumeList.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          type='interview'
          isSelected={selectedId === resume.id}
          onSelect={() => setResume(resume.id)}
        />
      ))}
    </section>
  );
};

export default ResumeCardsBox;
