'use client';
import { useRouter } from 'next/navigation';
import LoadingAnimation from '@/components/common/loading-animation';
import ResumeItem from '@/features/resume-list/resume-item';
import { useResumeListQuery } from '@/features/resume-list/hooks/use-resume-list-query';
import { getMyPagePath } from '@/features/my-page/utils/get-my-page-path';
import { TABS } from '@/constants/my-page-constants';
import EmptyList from '../my-page/empty-list';

const { RESUME_TAB } = TABS;

const ResumeList = () => {
  const router = useRouter();

  const { data: resumeList, isPending, isError } = useResumeListQuery();

  const handleGetDetailList = (resumeId: number) => {
    router.push(getMyPagePath(RESUME_TAB, resumeId));
  };

  if (isPending) {
    return (
      <div className='flex items-center justify-center'>
        <LoadingAnimation />
      </div>
    );
  }

  if (isError) return <div>자소서 리스트를 불러오는데 실패하였습니다.</div>;
  if (resumeList.length === 0) return <EmptyList tab={RESUME_TAB} />;
  return (
    <ul className='h-full overflow-y-auto scrollbar-hide'>
      {resumeList.map((resume, index) => {
        return (
          <ResumeItem
            key={resume.id}
            resume={resume}
            isLastChild={resumeList.length === index + 1}
            onClick={handleGetDetailList}
          />
        );
      })}
    </ul>
  );
};

export default ResumeList;
