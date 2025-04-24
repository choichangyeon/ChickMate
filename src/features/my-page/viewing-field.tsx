'use client';

import MyPageCharacter from '@/features/character/my-page-character';
import { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import { sanitizeQueryParams } from '@/utils/sanitize-query-params';
import { TABS } from '@/constants/my-page-constants';
import MyInfo from '@/features/my-page/my-info';
import InterviewDetailField from '@/features/interview-history/interview-detail-field';
import ResumeDetailField from '@/features/resume-list/resume-detail-field';

const { HISTORY, RESUME } = TABS;

type Props = {
  session: Session;
};

const ViewingField = ({ session }: Props) => {
  const searchParams = useSearchParams();
  const { id, tab } = sanitizeQueryParams(searchParams);
  const targetId = id ? Number(id) : null;

  return (
    <section className='flex h-[80dvh] w-1/2 flex-col'>
      {!targetId && (
        <>
          <div className='mb-8 flex w-full items-center justify-center'>
            <MyPageCharacter session={session} />
          </div>
          <div className='flex flex-1'>
            <MyInfo session={session} />
          </div>
        </>
      )}
      {targetId && tab === HISTORY && <InterviewDetailField interviewId={targetId} />}
      {targetId && tab === RESUME && <ResumeDetailField resumeId={targetId} />}
    </section>
  );
};

export default ViewingField;
