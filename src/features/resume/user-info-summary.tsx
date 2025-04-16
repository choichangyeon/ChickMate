'use client';

import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import Typography from '@/components/ui/typography';
import UserDataItem from '@/features/resume/user-data-item';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import type { Session } from 'next-auth';
import { metadata } from '@/app/layout';

const { META_DATA } = QUERY_KEY;

type Props = {
  session: Session;
};

const UserInfoSummary = ({ session }: Props) => {
  const queryClient = useQueryClient();
  const userMetaData = queryClient.getQueryData([META_DATA, session.user.id]) as UserMetaDataType;

  const { experienceType, educationLevel, jobType, mainRegion } = userMetaData;

  const userDatalist = [
    { label: '경력', content: experienceType },
    { label: '학력', content: educationLevel },
    { label: '직무', content: jobType },
    { label: '지역', content: mainRegion },
  ];

  return (
    <section className='w-[416px] shrink-0 rounded-lg border border-cool-gray-200 bg-cool-gray-10'>
      <div className='flex'>
        <Typography>내 정보</Typography>
        <Typography>북마크한 채용공고</Typography>
      </div>
      <div className='flex flex-col gap-4 p-8'>
        {userDatalist.map((userData) => {
          return <UserDataItem userData={userData} />;
        })}
      </div>
    </section>
  );
};

export default UserInfoSummary;
