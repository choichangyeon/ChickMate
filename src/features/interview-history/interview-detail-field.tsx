import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteInterviewMutation } from '@/features/interview-history/hook/use-delete-interview-mutation';
import { useGetInterviewDetailQuery } from '@/features/interview-history/hook/use-get-interview-detail-query';
import InterviewDetailFeedback, { FeedbackItem } from '@/features/interview-history/interview-detail-feedback';
import InterviewDetailHistory from '@/features/interview-history/interview-detail-history';
import { getErrorMessage } from '@/utils/get-error-message';
import ErrorComponent from '@/components/common/error-component';
import LeftArrowIcon from '@/components/icons/left-arrow-icon';
import Button from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/loading-spinner';
import Typography from '@/components/ui/typography';
import { PATH } from '@/constants/path-constant';
import { QUERY_KEY } from '@/constants/query-key';
import type { InterviewHistoryType } from '@/types/DTO/interview-history-dto';
import { useFuncDebounce } from '@/hooks/customs/use-func-debounce';

type Props = {
  interviewId: InterviewHistoryType['id'];
};

const { MY_PAGE } = PATH;
const SELECT_ACTIVE_TAB = {
  FEEDBACK: 'feedback',
  HISTORY: 'history',
};
const { TABS_COUNT } = QUERY_KEY;

const InterviewDetailField = ({ interviewId }: Props) => {
  const [activeTab, setActiveTab] = useState<string>(SELECT_ACTIVE_TAB.FEEDBACK);
  const { data, isPending, error, isError } = useGetInterviewDetailQuery(interviewId);
  const { mutateAsync: deleteInterviewAsyncMutation } = useDeleteInterviewMutation();

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleDeleteHistory = async () => {
    try {
      const res = await deleteInterviewAsyncMutation(interviewId);
      Notify.success(res.message);
      router.replace(MY_PAGE);
      queryClient.invalidateQueries({ queryKey: [TABS_COUNT] });
    } catch (error) {
      Notify.failure(getErrorMessage(error));
    }
  };

  const debounceDelete = useFuncDebounce(handleDeleteHistory, 2000);

  if (isPending)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );

  if (isError) {
    if (error) Notify.failure(error.message);
    return <ErrorComponent />;
  }

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
            className={`mx-4 cursor-pointer ${activeTab === SELECT_ACTIVE_TAB.FEEDBACK ? 'border-b-4 border-primary-orange-600' : 'border-none'}`}
            onClick={() => setActiveTab(SELECT_ACTIVE_TAB.FEEDBACK)}
          >
            <Typography
              size='xl'
              weight='bold'
              color={activeTab === SELECT_ACTIVE_TAB.FEEDBACK ? 'primary-600' : 'gray-500'}
            >
              최종 평가
            </Typography>
          </div>
          <div
            className={`mx-4 cursor-pointer ${activeTab === SELECT_ACTIVE_TAB.HISTORY ? 'border-b-4 border-primary-orange-600' : 'border-none'}`}
            onClick={() => setActiveTab(SELECT_ACTIVE_TAB.HISTORY)}
          >
            <Typography
              size='xl'
              weight='bold'
              color={activeTab === SELECT_ACTIVE_TAB.HISTORY ? 'primary-600' : 'gray-500'}
            >
              면접 기록
            </Typography>
          </div>
        </div>
      </div>
      {activeTab === SELECT_ACTIVE_TAB.FEEDBACK && <InterviewDetailFeedback feedback={feedback} />}
      {activeTab === SELECT_ACTIVE_TAB.HISTORY && <InterviewDetailHistory data={data} />}
      <div className='mt-auto pt-6'>
        <Button size='fixed' onClick={debounceDelete}>
          삭제하기
        </Button>
      </div>
    </div>
  );
};

export default InterviewDetailField;
