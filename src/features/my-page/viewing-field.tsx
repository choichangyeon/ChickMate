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
  const hasSearchParams = searchParams.toString();
  const targetId = Number(id);

  return (
    <section className='flex h-[80dvh] w-1/2 flex-col'>
      {!hasSearchParams && (
        <>
          <div className='mb-8 flex w-full items-center justify-center'>
            <MyPageCharacter session={session} />
          </div>
          <div className='flex flex-1'>
            <MyInfo session={session} />
          </div>
        </>
      )}
      {tab === HISTORY && <InterviewDetailField interviewId={targetId} />}
      {tab === RESUME && <ResumeDetailField resumeId={targetId} />}
    </section>
  );
};

export default ViewingField;
