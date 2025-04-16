'use client';

import MyPageCharacter from '@/features/character/my-page-character';
import { Session } from 'next-auth';
import MyInfo from '@/features/my-page/my-info';
import { useSearchParams } from 'next/navigation';
import { sanitizeQueryParams } from '@/utils/sanitize-query-params';
import InterviewDetailField from './interview-detail-field';

type Props = {
  session: Session;
};

const ViewingField = ({ session }: Props) => {
  const searchParams = useSearchParams();
  const { id, tab } = sanitizeQueryParams(searchParams);
  const hasSearchParams = searchParams.toString();

  return (
    <section className='h-[80dvh] w-1/2'>
      {!hasSearchParams && (
        <>
          <div className='mb-8 flex w-full items-center justify-center'>
            <MyPageCharacter session={session} />
          </div>
          <MyInfo session={session} />
        </>
      )}
      {tab === 'interviewHistories' && <InterviewDetailField id={id} />}
    </section>
  );
};

export default ViewingField;
