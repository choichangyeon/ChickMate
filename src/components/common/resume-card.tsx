'use client';

import Card from '@/components/common/card';
import Typography from '@/components/ui/typography';
import { formatDate } from '@/utils/format-date';
import { Resume } from '@prisma/client';
import clsx from 'clsx';

type Props = {
  resume: Resume;
  children?: React.ReactNode;
  // TODO: iconButton type 수정
  iconButton?: boolean;
};

const ResumeCard = ({ resume, iconButton, children }: Props) => {
  const { id, title, updatedAt, createdAt } = resume;
  const updatedAtDate = formatDate({ input: updatedAt });
  const createdAtDate = formatDate({ input: createdAt });

  const handleClick = () => {
    // TODO: 이력서 상세 페이지로 이동
    console.log(id);
  };

  return (
    <Card onClick={handleClick}>
      {iconButton && (
        // TODO: iconButton component 적용
        <div className='absolute right-[20px] top-[12px] h-6 w-6'>
          <div className='absolute left-[4px] top-[4px] h-0.5 w-4 bg-black' />
          <div className='absolute left-[8px] top-[2px] h-1 w-2 bg-black' />
          <div className='absolute left-[5px] top-[8px] h-3.5 w-3.5 bg-black' />
        </div>
      )}
      <div>
        <Typography size='sm' color='gray-500'>
          {updatedAt ? updatedAtDate : createdAtDate}
        </Typography>
        <Typography as='h3' weight='bold' className='line-clamp-2'>
          {title}
        </Typography>
      </div>
      {/* TODO: badge area */}
      <div className={badgeClassName}>{children} </div>
    </Card>
  );
};
const badgeClassName = clsx('flex gap-4');

export default ResumeCard;
