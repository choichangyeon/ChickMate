'use client';
import { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import MyPageCharacter from '@/features/character/my-page-character';
import MyInfo from '@/features/my-page/my-info';
import InterviewDetailField from '@/features/interview-history/interview-detail-field';
import ResumeDetailField from '@/features/resume-list/resume-detail-field';
import { sanitizeQueryParams } from '@/utils/sanitize-query-params';
import { TABS } from '@/constants/my-page-constants';

const { INTERVIEW_HISTORY_TAB, RESUME_TAB } = TABS;

type Props = {
  session: Session;
};

const ViewingField = ({ session }: Props) => {
  const searchParams = useSearchParams();
  const { id, tab } = sanitizeQueryParams(searchParams);
  const targetId = id ? Number(id) : null;
  const userId = session?.user.id ?? null;
  if (!userId) return null;
  return (
    <section
      className={clsx(
        'desktop:min-width-[634px] flex w-full flex-col self-center desktop:w-1/2',
        targetId ? 'h-full' : 'h-fit'
      )}
    >
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
      {targetId && tab === INTERVIEW_HISTORY_TAB && <InterviewDetailField interviewId={targetId} />}
      {targetId && tab === RESUME_TAB && <ResumeDetailField resumeId={targetId} userId={userId} />}
    </section>
  );
};

export default ViewingField;
