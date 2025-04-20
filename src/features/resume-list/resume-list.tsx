'use client';

import ResumeItem from '@/features/resume-list/resume-item';
import { useResumeListQuery } from '@/features/resume-list/hooks/use-resume-list-infinite-query';

const ResumeList = () => {
  const { data: resumeList, isPending, isError } = useResumeListQuery();

  return (
    <div>
      <ul className='h-full overflow-y-auto scrollbar-hide'>
        {resumeList.map((resume) => {
          return <ResumeItem key={resume.id} resume={resume} />;
        })}
      </ul>
    </div>
  );
};

export default ResumeList;
