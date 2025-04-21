'use client';

import LoadingSpinner from '@/components/ui/loading-spinner';
import ErrorComponent from '@/components/common/error-component';
import Typography from '@/components/ui/typography';
import Button from '@/components/ui/button';
import { PATH } from '@/constants/path-constant';
import ResumeQnAItem from '@/features/resume-list/resume-qna-item';
import { useResumeQuery } from '@/features/resume-list/hooks/use-resume-query';
import { useDeleteResumeMutation } from '@/features/resume/hooks/use-delete-resume-mutation';
import type { Field } from '@/types/resume';
import { QUERY_KEY } from '@/constants/query-key';

const { DETAIL } = PATH.RESUME;
const { RESUME } = QUERY_KEY;

type Props = {
  id: string;
};

const ResumeDetailField = ({ id }: Props) => {
  const resumeId = Number(id);
  const { data: resume, isPending, isError } = useResumeQuery(resumeId);
  const { mutate: deleteResumeMutate } = useDeleteResumeMutation(RESUME);

  const handleDeleteResume = (resumeId: number) => {
    if (window.confirm('자기소개서를 정말로 삭제하시겠습니까?')) {
      deleteResumeMutate(resumeId);
    }
  };

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
        <Button variant='outline' color='dark' size='large' link={true} href={`${DETAIL(resumeId)}`}>
          수정하기
        </Button>
        <Button variant='outline' color='dark' size='large' onClick={() => handleDeleteResume(resumeId)}>
          삭제하기
        </Button>
      </div>
    </section>
  );
};

export default ResumeDetailField;
