'use client';

import ResumeItem from '@/features/resume-list/resume-item';
import { useResumeListQuery } from '@/features/resume-list/hooks/use-resume-list-infinite-query';
import LoadingSpinner from '@/components/ui/loading-spinner';

const ResumeList = () => {
  const { data: resumeList, isPending, isError } = useResumeListQuery();

  if (isPending) {
    return (
      <div className='flex h-[70dvh] flex-col items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) return <div>자소서 리스트를 불러오는데 실패하였습니다.</div>;

  return (
    <div>
      <ul className='flex h-full flex-col gap-4 overflow-y-auto scrollbar-hide'>
        {resumeList.map((resume) => {
          return (
            <div key={resume.id} className='flex flex-col gap-4'>
              <ResumeItem resume={resume} />
              <hr className='border-cool-gray-300' />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ResumeList;
