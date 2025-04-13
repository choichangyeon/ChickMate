'use client';
import ResumeCard from '@/components/common/resume-card';
import { useEffect, useState } from 'react';

const ResumeCardsBox = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedId === null && mockList.length > 0) {
      setSelectedId(mockList[0].id);
    }
  }, []);

  return (
    <div className='flex max-w-[100vw] flex-row flex-nowrap gap-5 overflow-x-auto scrollbar-hide'>
      {mockList.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          type='interview'
          isSelected={selectedId === resume.id}
          onSelect={() => setSelectedId(resume.id)}
        />
      ))}
    </div>
  );
};

export default ResumeCardsBox;

const mockList = [
  {
    id: 1,
    title: '이력서 제목 조금 더 길게 작성해보자 하하하',
    userId: 'userId',
    status: 1,
    content: '이력서 내용',
    tryCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: '이력서 제목 조금 더 길게 작성해보자 하하하',
    userId: 'userId',
    status: 1,
    content: '이력서 내용',
    tryCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: '이력서 제목 조금 더 길게 작성해보자 하하하',
    userId: 'userId',
    status: 1,
    content: '이력서 내용',
    tryCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: '이력서 제목 조금 더 길게 작성해보자 하하하',
    userId: 'userId',
    status: 1,
    content: '이력서 내용',
    tryCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: '이력서 제목 조금 더 길게 작성해보자 하하하',
    userId: 'userId',
    status: 1,
    content: '이력서 내용',
    tryCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: '이력서 제목 조금 더 길게 작성해보자 하하하',
    userId: 'userId',
    status: 1,
    content: '이력서 내용',
    tryCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    title: '이력서 제목 조금 더 길게 작성해보자 하하하',
    userId: 'userId',
    status: 1,
    content: '이력서 내용',
    tryCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    title: '이력서 제목 조금 더 길게 작성해보자 하하하',
    userId: 'userId',
    status: 1,
    content: '이력서 내용',
    tryCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
