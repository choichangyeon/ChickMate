'use client';

import { getJobByUserMetaData } from '@/features/job/api/client-services';

const JobPostingCard = () => {
  const handleClick = async () => {
    // TODO : 유저 데이터 가져오기
    await getJobByUserMetaData({
      educationLevel: '대학교 졸업(4년제)',
      location: { mainRegion: '서울' },
      experienceType: '경력',
      jobType: 'IT개발·데이터',
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
