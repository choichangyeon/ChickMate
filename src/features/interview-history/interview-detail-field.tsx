import LeftArrowIcon from '@/components/icons/left-arrow-icon';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants/path-constant';
import Link from 'next/link';
import { useState } from 'react';
import InterviewDetailFeedback, { FeedbackItem } from './interview-detail-feedback';
import InterviewDetailHistory from './interview-detail-history';
import LoadingSpinner from '@/components/ui/loading-spinner';
import ErrorComponent from '@/components/common/error-component';
import { useGetInterviewDetailQuery } from '@/features/interview-history/hook/use-get-interview-detail-query';
import { useDeleteInterviewMutation } from '@/features/interview-history/hook/use-delete-interview-mutation';
import Button from '@/components/ui/button';

type Props = {
  id: number;
};

const { MY_PAGE } = PATH;

const InterviewDetailField = ({ id }: Props) => {
  const [activeTab, setActiveTab] = useState<string>('feedback');
  const { data, isPending, isError } = useGetInterviewDetailQuery(id);
  const { mutate: deleteInterviewMutation } = useDeleteInterviewMutation();

  if (isPending)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  if (isError)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <ErrorComponent />
      </div>
    );

  const feedback = data.feedback as FeedbackItem[];

  return (
    <div className='flex h-full flex-col'>
      <div className='mb-8 flex items-center gap-7'>
        <Link href={MY_PAGE}>
          <LeftArrowIcon />
        </Link>
        <div>
          <Typography size='3xl' weight='bold'>
            면접 결과
          </Typography>
          <Typography size='xl' weight='normal' color='gray-500'>
            {data.resume.title}
          </Typography>
        </div>
      </div>

      <div className='mb-4 flex flex-col gap-4'>
        <div className='flex border-b'>
          <div
            className={`mx-4 cursor-pointer ${activeTab === 'feedback' ? 'border-b-4 border-primary-orange-600' : 'border-none'}`}
            onClick={() => setActiveTab('feedback')}
          >
            <Typography size='xl' weight='bold' color={activeTab === 'feedback' ? 'primary-600' : 'gray-500'}>
              최종 평가
            </Typography>
          </div>
          <div
            className={`mx-4 cursor-pointer ${activeTab === 'history' ? 'border-b-4 border-primary-orange-600' : 'border-none'}`}
            onClick={() => setActiveTab('history')}
          >
            <Typography size='xl' weight='bold' color={activeTab === 'history' ? 'primary-600' : 'gray-500'}>
              면접 기록
            </Typography>
          </div>
        </div>
      </div>
      {activeTab === 'feedback' && <InterviewDetailFeedback feedback={feedback} />}
      {activeTab === 'history' && <InterviewDetailHistory data={data} />}
      <div className='mt-auto pt-6'>
        <Button variant='outline' color='dark' size='large' onClick={() => deleteInterviewMutation(id)}>
          삭제하기
        </Button>
      </div>
    </div>
  );
};

export default InterviewDetailField;
