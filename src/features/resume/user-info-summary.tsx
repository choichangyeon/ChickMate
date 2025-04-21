'use client';

import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constants/query-key';
import Typography from '@/components/ui/typography';
import UserDataItem from '@/features/resume/user-data-item';
import type { UserMetaDataType } from '@/types/user-meta-data-type';
import type { Session } from 'next-auth';
import { metadata } from '@/app/layout';
import { useMetaDataQuery } from '@/features/user-meta-data/hooks/use-meta-data-query';
import BlockComponent from '@/components/common/block-component';

const { META_DATA } = QUERY_KEY;

type Props = {
  session: Session;
};

const UserInfoSummary = ({ session }: Props) => {
  const queryClient = useQueryClient();
  const userMetaData = queryClient.getQueryData([META_DATA, session.user.id]) as UserMetaDataType;

  if (!userMetaData) {
    return (
      <section className='flex w-[416px] shrink-0 justify-center rounded-lg border border-cool-gray-200 bg-cool-gray-10'>
        <BlockComponent
          firstLine='이런! 사용자 정보를 설정하지 않았네요!'
          secondLine='사용자 정보 필요'
          thirdLine='해당 기능은 사용자 정보가 필요합니다.'
        />
      </section>
    );
  }

  const { experienceName, requiredEducationName, jobMidCodeName, locationName } = userMetaData;

  const userDatalist = [
    { label: '경력', content: experienceName },
    { label: '학력', content: requiredEducationName },
    { label: '직무', content: jobMidCodeName },
    { label: '지역', content: locationName },
  ];

  return (
    <section className='w-[416px] shrink-0 rounded-lg border border-cool-gray-200 bg-cool-gray-10'>
      <div className='flex'>
        <Typography>내 정보</Typography>
        <Typography>북마크한 채용공고</Typography>
      </div>
      <div className='flex flex-col gap-4 p-8'>
        {userDatalist.map((userData) => {
          return <UserDataItem key={userData.label} userData={userData} />;
        })}
      </div>
    </section>
  );
};

export default UserInfoSummary;
