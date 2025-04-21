'use client';

import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { TABS } from '@/constants/my-page-constants';
import ResumeItem from '@/features/resume-list/resume-item';
import { useResumeListQuery } from '@/features/resume-list/hooks/use-resume-list-query';

const { RESUME } = TABS;

const ResumeList = () => {
  const router = useRouter();

  const { data: resumeList, isPending, isError } = useResumeListQuery();

  const handleGetDetailList = (resumeId: number) => {
    router.push(`?id=${resumeId}&tab=${RESUME}`);
  };

  if (isPending) {
    return (
      <div className='flex h-[70dvh] items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) return <div>자소서 리스트를 불러오는데 실패하였습니다.</div>;

  return (
    <ul className='flex h-[70dvh] flex-col gap-4 overflow-y-auto scrollbar-hide'>
      {resumeList.map((resume) => {
        return (
          <div key={resume.id} className='flex flex-col gap-4'>
            <ResumeItem resume={resume} onClick={handleGetDetailList} />
            <hr className='border-cool-gray-300' />
          </div>
        );
      })}
    </ul>
  );
};

export default ResumeList;
