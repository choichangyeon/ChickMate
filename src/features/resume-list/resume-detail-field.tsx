'use client';

import LoadingSpinner from '@/components/ui/loading-spinner';
import { useResumeQuery } from './hooks/use-resume-query';
import ErrorComponent from '@/components/common/error-component';
import Typography from '@/components/ui/typography';
import ResumeQnAItem from '@/features/resume-list/resume-qna-item';

type Props = {
  id: string;
};

const ResumeDetailField = ({ id }: Props) => {
  const resumeId = Number(id);
  const { data: resume, isPending, isError } = useResumeQuery(resumeId);

  if (isPending) return <LoadingSpinner />;
  if (isError) return <ErrorComponent />;

  return (
    <section className='flex h-[643px] flex-col gap-8 overflow-y-auto'>
      <div>
        <Typography size='3xl' weight='bold'>
          내 자소서
        </Typography>
        <Typography size='xl' color='gray-500' weight='normal'>
          {resume.title}
        </Typography>
      </div>
      <ul className='flex flex-col gap-4'>
        {resume.content.map((content) => {
          return <ResumeQnAItem key={content.id} content={content} />;
        })}
      </ul>
    </section>
  );
};

export default ResumeDetailField;
