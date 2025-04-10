'use client';

import Card from '@/components/common/card';
import { getJobByUserMetaData } from '@/features/job/api/client-services';
import { JobPosting } from '@prisma/client';

const JobPostingCard = () => {
  const handleClick = async () => {
    // TODO : 유저 데이터 가져오기
    const jobPostingList: JobPosting[] = await getJobByUserMetaData({
      educationLevel: '대졸(4년)',
      location: { mainRegion: '경남' },
      experienceType: '신입',
      jobType: '의료',
    });
  };
  return (
    <Card subTitle='2025.05.31' mainTitle='2025년 상반기 CJ제일제당' content='(식품/공통부문)' iconButton={true}>
      <p>JobPostingCard</p>
      <button onClick={handleClick}>테스트</button>
    </Card>
  );
};

export default JobPostingCard;
