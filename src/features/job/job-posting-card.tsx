'use client';

import { getJobByUserMetaData } from '@/features/job/api/client-services';

const JobPostingCard = () => {
  const handleClick = async () => {
    // TODO : 유저 데이터 가져오기
    await getJobByUserMetaData({
      educationLevel: '대졸(4년)',
      location: { mainRegion: '경남' },
      experienceType: '신입',
      jobType: '의료',
    });
  };
  return (
    <div>
      JobPostingCard
      <button onClick={handleClick}>테스트</button>
    </div>
  );
};

export default JobPostingCard;
