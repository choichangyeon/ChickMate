'use client';
import { useRouter } from 'next/navigation';
import ResumeItem from '@/features/resume-list/resume-item';
import { useResumeListQuery } from '@/features/resume-list/hooks/use-resume-list-query';
import { getMyPagePath } from '@/features/my-page/utils/get-my-page-path';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { TABS } from '@/constants/my-page-constants';

const { RESUME_TAB } = TABS;

const ResumeList = () => {
  const router = useRouter();

  const { data: resumeList, isPending, isError } = useResumeListQuery();

  const handleGetDetailList = (resumeId: number) => {
    router.push(getMyPagePath(RESUME_TAB, resumeId));
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
    <ul className='flex h-full flex-col gap-4 overflow-scroll scrollbar-hide'>
      {resumeList.map((resume) => {
        return <ResumeItem key={resume.id} resume={resume} onClick={handleGetDetailList} />;
      })}
    </ul>
  );
};

export default ResumeList;
