'use client';

import LoadingSpinner from '@/components/ui/loading-spinner';
import { useResumeQuery } from './hooks/use-resume-query';
import ErrorComponent from '@/components/common/error-component';
import Typography from '@/components/ui/typography';
import ResumeQnAItem from '@/features/resume-list/resume-qna-item';
import type { Field } from '@/types/resume';
import Button from '@/components/ui/button';

type Props = {
  id: string;
};

const ResumeDetailField = ({ id }: Props) => {
  const resumeId = Number(id);
  const { data: resume, isPending, isError } = useResumeQuery(resumeId);

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorComponent />;

  const resumeContent = resume.content as Field[];

  return (
    <section className='flex h-[80dvh] flex-col gap-8'>
      <div>
        <Typography size='3xl' weight='bold'>
          내 자소서
        </Typography>
        <Typography size='xl' color='gray-500' weight='normal'>
          {resume.title}
        </Typography>
      </div>
      <ul className='flex h-[70dvh] flex-col gap-4 overflow-y-auto scrollbar-hide'>
        {resumeContent.map((content, idx) => {
          return <ResumeQnAItem key={content.id} content={content} idx={idx} />;
        })}
      </ul>
      <div className='flex gap-8'>
        <Button variant='outline' color='dark' size='large'>
          수정하기
        </Button>
        <Button variant='outline' color='dark' size='large'>
          삭제하기
        </Button>
      </div>
    </section>
  );
};

export default ResumeDetailField;
