'use client';
import ResumeCard from '@/features/interview/resume-card';
import { useEffect } from 'react';
import useResumeStore from '@/features/interview/hooks/use-resume-store';
import { useSubmitResumesQuery } from '@/hooks/queries/use-submit-resumes-query';
import BlockComponent from '@/components/common/block-component';
import { PATH } from '@/constants/path-constant';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Session } from 'next-auth';
import InterviewBlockComponent from './interview-block-component';

const { ROOT } = PATH.RESUME;

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
        <LoadingSpinner />
      </div>
    );
  }
  if (isError || !resumeList) return <div>Error...</div>;
  // TODO: 자소서 작성 페이지 라우팅 UI 구현 -> 민철님에게 요청 완료
  if (resumeList.length === 0)
    return (
      <section className='flex h-44 max-w-[100vw] flex-col items-center justify-center'>
        <BlockComponent
          firstLine='이런! 작성한 자소서가 없어요!'
          secondLine='자소서를 작성하러 가볼까요?'
          thirdLine='AI면접은 자소서기반으로 진행됩니다'
          buttonName='자소서 작성하기'
          href={ROOT}
        ></BlockComponent>
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
